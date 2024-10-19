"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface JoinRoomModalProps {
  isOpen: boolean
  onClose: () => void
  handleJoinRoom: (data: { name: string; email: string; password?: string }) => void
  isPasswordRequired: boolean
}

export default function JoinRoomModal({
  isOpen,
  onClose,
  handleJoinRoom,
  isPasswordRequired,
}: JoinRoomModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleJoinRoom({ name, email, password: isPasswordRequired ? password : undefined })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">Join a room</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Enter your details to join the video call room
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                Your Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                placeholder="john@example.com"
              />
            </div>

            {isPasswordRequired && (
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Room Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={isPasswordRequired}
                  className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter room password"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 transition-colors">
            Join Room
            <Users className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
