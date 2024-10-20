"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWebSocket } from "@/hooks/useSocket";
import Loader from "@/components/ui/loader";
import { CHECK_ROOM, CREATE_ROOM, JOIN_ROOM, ROOM_NOT_FOUND } from "@/constants/messages";
import toast from "react-hot-toast";
import CreateRoomModal from "@/components/common/CreateRoomModal";
import JoinRoomModal from "@/components/common/JoinRoomModal";


export default function Home() {
  const { socket, isConnected } = useWebSocket();
  const router = useRouter();

  const [roomCode, setRoomCode] = useState<string>("");
  const [joinRoomModal, setJoinRoomModal] = useState<boolean>(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
  const [createRoomModal, setCreateRoomModal] = useState<boolean>(false);

  const handleSumbit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();

    socket?.send(
      JSON.stringify({
        type: CHECK_ROOM,
        roomId: roomCode,
      })
    );

    socket!.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.ROOM_NOT_FOUND) {
        return toast.error("Room not found");
      } else {
        setIsPasswordRequired(data.PASSWORD_REQUIRED);
        setJoinRoomModal(true);
      }
    };
  };

  const handleCreateRoomSubmit = async (data: {
    name: string;
    email: string;
    password: string;
    isPasswordRequired: boolean;
  }) => {
    socket?.send(
      JSON.stringify({
        type: CREATE_ROOM,
        userName: data.name,
        userEmail: data.email,
        password: data.password,
        isPasswordRequired: data.isPasswordRequired,
      })
    );
    
    socket!.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.ROOM_CREATED) {
        toast.success("Room created successfully");
        router.push(`/room/${data.roomId}`);
      }
      else {
        toast.error("Room creation failed");
      }
    }
  };

  const handleJoinRoomSubmit = async (data: {
    name: string;
    email: string;
    password?: string;
  }) => {
    socket?.send(
      JSON.stringify({
        type: JOIN_ROOM,
        roomId: parseInt(roomCode),
        userName: data.name,
        userEmail: data.email,
        password: data.password,
      })
    );

    socket!.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.ROOM_JOINED) {
        toast.success("Room joined successfully");
        router.push(`/room/${roomCode}`);
      } else if (data.WRONG_PASSWORD) {
        toast.error("Wrong password");
      }
    };
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-5xl w-full flex space-x-8">
          <div className="w-full text-left sm:w-1/2">
            <h2 className="mt-6 text-5xl font-extrabold">
              MultiMeet <br />
              Free browser-based Real-time video calls. Simple, Secure, Fast.
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Start your next video call with a single click. No download,
              plug-in, or login is required. Just get straight to talking,
              messaging, and sharing your screen.
            </p>
          </div>

          <div className=""></div>
        </div>
      </main>
      <div className="flex justify-center  mb-12">
        <div className="w-2/3 lg:w-2/5 ">
            <Button
              className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              onClick={() => setCreateRoomModal(true)}
            >
              Create Room
              <Users className="ml-2 h-5 w-5" />
            </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 py-1 bg-black text-gray-400">
                Or join an existing room
              </span>
            </div>
          </div>

          <form className="space-y-3" onSubmit={handleSumbit}>
            <Input
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Join Room
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
      {!isConnected && <Loader />}
      {createRoomModal && (
        <CreateRoomModal
          onClose={() => setCreateRoomModal(false)}
          isOpen={createRoomModal}
          handleCreateRoom={handleCreateRoomSubmit}
        />
      )}
      {joinRoomModal && (
        <JoinRoomModal
          isOpen={joinRoomModal}
          onClose={() => setJoinRoomModal(false)}
          isPasswordRequired={isPasswordRequired}
          handleJoinRoom={handleJoinRoomSubmit}
        />
      )}
    </div>
  );
}
