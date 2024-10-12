export interface UsersInRoom{
    userName: string;
    userEmail: string;
    isAdmin: boolean;
    userSocketConnection: WebSocket;
    userChatMessages: string[];
}
