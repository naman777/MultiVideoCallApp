import {Room} from "./Room";

class RoomManager {
    private Rooms: Room[];

    constructor() {
        this.Rooms=[];
    }

    createRoom(roomId:number){
        this.Rooms.push(new Room(roomId));
    }



}