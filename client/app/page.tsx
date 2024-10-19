"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>("");

  const router = useRouter();

  const handleJoinRoom: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    console.log(roomCode);
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-5xl w-full flex space-x-8">
          <div className="w-1/2 text-left">
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

          <div className="w-1/2 space-y-6">
            
          </div>
        </div>

        
      </main>
      <div className="flex justify-center  mb-12">

      <div className="w-2/5 ">
      <Link href="/create-room">
              <Button className="w-full py-6 text-lg bg-purple-600 hover:bg-purple-700 transition-colors">
                Create Room
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>

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

            <form className="space-y-3" onSubmit={handleJoinRoom}>
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
    </div>
  );
}
