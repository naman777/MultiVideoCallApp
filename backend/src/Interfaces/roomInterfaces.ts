export interface CreateRoomDetails{
    userName: string;
    userEmail: string;
    roomId: number;
    isPasswordRequired: boolean;
    password: string;
    socket: WebSocket;  
}

export interface UsersInRoom{
    userName: string;
    userEmail: string;
    isAdmin: boolean;
    userSocketConnection: WebSocket;
    userChatMessages: string[];
}

export interface JoinRoomDetails{
    roomId: number;
    userName: string;
    userEmail: string;
    socket: WebSocket;
    password: string;   
}