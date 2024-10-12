export class RoomIdCreaterService {
    private roomId: number[];

    constructor() {
        this.roomId = [];
    }

    createRoomId(roomId: number) {
        this.roomId.push(roomId);
        return roomId;
    }

    giveRoomId() {
        let roomId: number;
        do{
            roomId = Math.floor(1000 + Math.random() * 9000);
        }
        while(this.roomId.includes(roomId));

        this.roomId.push(roomId);
        return roomId;
    }

    deleteRoomId(roomId: number) {
        this.roomId = this.roomId.filter(id => id !== roomId);
    }
}
