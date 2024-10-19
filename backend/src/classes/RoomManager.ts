import {
  CHECK_ROOM,
  CREATE_ROOM,
  JOIN_ROOM,
  PASSWORD_REQUIRED,
  ROOM_NOT_FOUND,
} from "../constants/messages";
import {
  CreateRoomDetails,
  JoinRoomDetails,
  UsersInRoom,
} from "../Interfaces/roomInterfaces";
import { RoomIdCreaterService } from "../services/roomIdCreaterService";
import { Room } from "./room";

const roomIdCreaterService = new RoomIdCreaterService();

export class RoomManager {
  private Rooms: Room[];

  constructor() {
    this.Rooms = [];
  }

  handleMessages(message: any) {
    if (message.type === CREATE_ROOM) {
      this.createRoom(message);
    } else if (message.type === JOIN_ROOM) {
      this.joinRoom(message);
    } else if (message.type === CHECK_ROOM) {
      this.checkRoomPassword(message);
    }
  }

  createRoom(payload: CreateRoomDetails) {
    const roomId = roomIdCreaterService.giveRoomId();
    payload = {
      ...payload,
      roomId: roomId,
    };
    this.Rooms.push(new Room(payload));
    console.log("Room Created with ID: ", roomId);
  }

  checkRoomPassword(payload: JoinRoomDetails) {
    //@ts-ignore
    const roomId = parseInt(payload.roomId);  
    const room = this.Rooms.find((room) => room.getRoomId() === roomId);

    if (room) {
      const isPasswordRequired = room.getIsPasswordRequired();
      payload.socket.send(
        JSON.stringify({
          PASSWORD_REQUIRED: isPasswordRequired,
          ROOM_NOT_FOUND: false,
        })
      );
    } else {
      payload.socket.send(JSON.stringify({ ROOM_NOT_FOUND: true }));
    }
  }

  joinRoom(payload: JoinRoomDetails) {
    //@ts-ignore
    const room = this.Rooms.find((room) => room.getRoomId() === parseInt(payload.roomId));

    if (room) {
      room.addUser(payload);
    }
    else{
      payload.socket.send(JSON.stringify({ ROOM_NOT_FOUND: true }));
    }
  }
}
