import { ROOM_CREATED, ROOM_JOINED } from "../constants/messages";
import {
  CreateRoomDetails,
  JoinRoomDetails,
  UsersInRoom,
} from "../Interfaces/roomInterfaces";

export class Room {
  private roomId: number;
  private isPasswordRequired: boolean;
  private password: string;
  private users: UsersInRoom[];

  constructor(roomDetails: CreateRoomDetails) {
    this.roomId = roomDetails.roomId;
    this.users = [];
    this.users.push({
      userName: roomDetails.userName,
      userEmail: roomDetails.userEmail,
      isAdmin: true,
      userSocketConnection: roomDetails.socket,
      userChatMessages: [],
    });
    this.isPasswordRequired = roomDetails.isPasswordRequired;
    this.password = roomDetails.password;
    roomDetails.socket.send(
      JSON.stringify({ ROOM_CREATED: true, roomId: this.roomId })
    );
  }

  getRoomId() {
    return this.roomId;
  }

  getIsPasswordRequired() {
    return this.isPasswordRequired;
  }

  addUser(userDetails: JoinRoomDetails) {
    if (this.isPasswordRequired && this.password !== userDetails.password) {
      userDetails.socket.send(
        JSON.stringify({ PASSWORD_REQUIRED: true, WRONG_PASSWORD: true, ROOM_JOINED: false })
      );
      return;
    } else {
      userDetails.socket.send(
        JSON.stringify({ ROOM_JOINED: true, WRONG_PASSWORD: false })
      );
    }

    const user = {
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
      isAdmin: false,
      userSocketConnection: userDetails.socket,
      userChatMessages: [],
    };

    this.users.push(user);
  }

  broadcast(message: any) {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].userSocketConnection.send(message);
    }
  }
}
