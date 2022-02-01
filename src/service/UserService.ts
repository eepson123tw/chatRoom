export type UserData = {
  id: string;
  userName: string;
  roomName: string;
};

export default class UserService {
  //記錄使用者的資訊
  private userMap: Map<string, UserData>;

  constructor() {
    this.userMap = new Map();
  }

  addUser(data: UserData) {
    this.userMap.set(data.id, data);
  }
  deleteUser(id: string) {
    if (this.userMap.has(id)) {
      this.userMap.delete(id);
    }
  }

  getUser(id: string) {
    const data = this.userMap.get(id);
    if (data) {
      return data;
    }
    return null;
  }

  userDataInfo(id: string, userName: string, roomName: string): UserData {
    return {
      id,
      userName,
      roomName,
    };
  }
}
