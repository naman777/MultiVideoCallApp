'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Video, Lock, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'  // Optional if you want to redirect after submission

export default function CreateRoom() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordRequired, setIsPasswordRequired] = useState(false)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = {
      name,
      email,
      isPasswordRequired,
      ...(isPasswordRequired && { password }),  
    }

    try {
      
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 border-b border-gray-800 flex justify-between items-center">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Video className="w-6 h-6" />
          Create Room
        </h1>
        <div className="w-6 h-6" /> 
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold">Set up your room</h2>
            <p className="mt-2 text-sm text-gray-400">Fill in the details to create your video call room</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-900 mt-1"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-900 mt-1"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requirePassword"
                  checked={isPasswordRequired}
                  onCheckedChange={(checked) => setIsPasswordRequired(checked as boolean)}
                />
                <Label
                  htmlFor="requirePassword"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Require password for the room
                </Label>
              </div>
              
              {isPasswordRequired && (
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Room Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-900 mt-1"
                    placeholder="Enter room password"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 transition-colors">
              Create Room
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
