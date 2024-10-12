import {UsersInRoom} from "../Interfaces/UsersInRoom";

export class Room {
    private roomId: number;
    private users: UsersInRoom[];

    constructor(roomId: number) {
        this.roomId = roomId;
        this.users = [];
    }

    addUser(user: UsersInRoom) {
        this.users.push(user);
    }

    broadcast(message: any) {
        for(let i=0; i<this.users.length; i++) {
            this.users[i].userSocketConnection.send(message);
        }
    }




}