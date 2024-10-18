"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Users, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {

  const [roomCode, setRoomCode] = useState<string>("");

  const router = useRouter();

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(roomCode);
    router.push(`/room/${roomCode}`);
  }



  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Video className="w-6 h-6" />
          MultiMeet
        </h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold">Welcome to MultiMeet</h2>
            <p className="mt-2 text-sm text-gray-400">Connect with others through video calls</p>
          </div>
          
          <div className="mt-8 space-y-6">
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
                <span className="px-2 bg-black text-gray-400">Or join an existing room</span>
              </div>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleJoinRoom}>
              <Input
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-900"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              />
              <Button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 transition-colors">
              Join Room
              <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <footer className="p-6 border-t border-gray-800 text-center text-sm text-gray-500">
        Made with ❤️ by <Link href="https://github.com/naman777">Naman Kundra</Link>
      </footer>
    </div>
  )
}