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

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-[#10141C] text-white flex flex-col items-center justify-center">
      <main className="flex-grow flex items-center justify-center w-full">
        <div className="max-w-4xl w-full space-y-12 text-center">
          {/* Header Section */}
          <div className="text-left mb-10">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
              MiroTalk SFU
              <br />
              Free browser-based Real-time video calls.
            </h2>
            <p className="mt-4 text-base text-gray-400">
              Start your next video call with a single click. No download, plug-in, or login is required. Just get straight to talking, messaging, and sharing your screen.
            </p>
          </div>

          {/* Room Form Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative flex flex-col items-center space-y-4">
              {/* Room Code Suggestion */}
              <div className="text-lg text-gray-200">Pick a room name. How about this one?</div>
              <Input
                type="text"
                required
                className="appearance-none rounded-md block w-96 px-5 py-4 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                className="w-40 py-4 bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Join Room
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                className="w-40 py-4 bg-gray-600 hover:bg-gray-700 transition-colors"
                onClick={() => setRoomCode('')}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
