import devServer from '@/sever/dev'
import prodServer from '@/sever/prod'
import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import moment from 'moment'
import UserService from '@/service/UserService'

const port = 3000
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const userService = new UserService()

//監測連接 socket 為前端
io.on('connection', (socket) => {
  //區分使用者

  socket.emit('userId', socket.id)

  socket.on(
    'join',
    ({ userName, roomName }: { userName: string; roomName: string }) => {
      const userData = userService.userDataInfo(socket.id, userName, roomName)

      //建立不被干擾的唯一空間
      socket.join(userData.roomName)

      userService.addUser(userData)
      //發送至空間
      //broadcast 不會播送給自己
      socket.broadcast
        .to(userData.roomName)
        .emit('join', `${userName} 加入了${roomName}聊天室`)
    }
  )
  socket.on('chat', (msg) => {
    const userData = userService.getUser(socket.id)
    const time = moment.utc()
    //to 會播送給自己
    if (userData) {
      io.to(userData.roomName).emit('chat', {
        userData,
        msg,
        time
      })
    }
  })

  socket.on('disconnect', () => {
    const userData = userService.getUser(socket.id)
    if (userData?.userName) {
      socket.broadcast
        .to(userData.roomName)
        .emit('leave', `${userData.userName}離開聊天室`)
    }
    userService.deleteUser(socket.id)
  })
})

// 執行npm run dev本地開發 or 執行npm run start部署後啟動線上伺服器
if (process.env.NODE_ENV === 'development') {
  devServer(app)
} else {
  prodServer(app)
}

server.listen(port, () => {
  console.log(`The application is running on port ${port}.`)
})

// let a: number = 113231

// const ary: (string | boolean)[] = [];

// ary.push(true);

// const obj: { name: string } = { name: "allen" };

// console.log(a)

// interface fish {
//   name: Function;
// }

// // interface shark extends fish {
// //   bite: () => {}
// // }

// // let bigShark: shark = {
// //   name() {}
// // }

// enum status {
//   "good" = 1,
//   "wow" = "good",
// }

// function print<T>(type: T) {
//   console.log(type);
// }

// print({ name: 123 });

// print<string>("123");

// function arrayNumber(...num: number[]) {}

// arrayNumber(1, 2, 3, 4);

// const numx = [1, 2, 3] as const;

// arrayNumber(...numx);

// //intertface  implements 練習

// interface human {
//   name: string;
//   age: number;

//   canThink: () => boolean;
//   canSleep: () => boolean;
// }

// class Allen implements human {
//   name = "allen";
//   age = 18;
//   canThink = () => {
//     console.log("yes,can think");
//     return true;
//   };
//   canSleep = () => {
//     return true;
//   };
// }

// const allen = new Allen();
// console.log(allen.canThink());

// //抽象類別實作

// abstract class Hand {
//   drag() {
//     console.log("can drag");
//   }
//   abstract nono: Function;
// }

// class BigHand extends Hand {
//   nono = () => {};
// }

// ///公私有函數  private protected public

// class Name {
//   private name = "123";
//   protected bigName = "456";
//   public smallName = "789";

//   getName() {
//     return this.name;
//   }
// }

// class wow extends Name {
//   print() {
//     console.log(this.bigName);
//   }
// }

// const allenName = new wow();

// allenName.print();
// // console.log(allenName.print());

// // const bank = (money: number) => (cost: number) => {
// //   console.log("銀行餘額", money);
// //   console.log("此次消費", cost);
// //   console.log("消費後剩餘", money - cost);
// //   money = money - cost;
// // };

// // const cost = bank(2000);
// // cost(500);
// // cost(500);

// // static 靜態
// class Bank {
//   private static price = 1000;
//   static cost = (cost: number) => {
//     this.price -= cost;
//   };
//   static getLastPrice = () => {
//     console.log(this.price);
//   };
// }

// const printBankPrice = () => {
//   Bank.cost(500);
//   Bank.getLastPrice();
// };

// // printBankPrice();
// // printBankPrice();

// interface FishMan<T> {
//   name: T;
// }

// class CreateFishMan<TT> implements FishMan<TT> {
//   name: TT;
//   constructor(name: TT) {
//     this.name = name;
//   }
// }

// const fishMan = new CreateFishMan({ name: "Allen" });

// //先相容一屬性 能使用此方法
// function aryFn<T extends Array<T>>(a: T) {
//   console.log(a.length);
// }

// const ary2F = <T extends Array<T>>(a: T) => {
//   console.log(a);
// };

// //使用extends 去做相容判斷後 宣告infer h

// // type TT2<T> = T extends Array<infer H> ? H : never

// // type TT3 = TT2<[1, 2, 3]>

// type paramInfer<T> = T extends (param: infer A) => any ? A : never;

// type allenInfer = paramInfer<(a: boolean) => void>;

// interface yy {
//   name: string; //name
//   age: number;
//   wow: Function;
// }

// type yType = keyof yy;
// const name: yType = "name";

// const getObjValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
//   return obj[key];
// };
