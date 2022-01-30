module.exports = {
  //只引入有使用到的tailwind css ，不然會整包裝入
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.ts"],
  mode: "jit", //just in time 且可以直接在html拓展 原先tailwind沒有定義的東西
  //夜間模式
  darkMode: false, // or 'media' or 'class'
  theme: {
    //主題 //如無extend會直接覆蓋
    screens: {
      //自訂義 rwd大小
      yy: "1280px", //大於等於 600px
      // => @media (min-width: 1280px) { ... }
      table: { max: "640px" }, //小於等於 600px
      // => @media (max-width: 640px) { ... }
    },
  },
  variants: {
    //拓展 原先未被定義的狀態  (自定義)
    extend: {
      ringWidth: ["active"],
    },
  },
  plugins: [],
};
