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

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  handleCreateRoom: (data: { name: string; email: string; password: string, isPasswordRequired:boolean }) => void
}

export default function CreateRoomModal({ isOpen, onClose, handleCreateRoom}: CreateRoomModalProps
) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [requirePassword, setRequirePassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCreateRoom({ name, email, password, isPasswordRequired: requirePassword })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">Set up your room</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Fill in the details to create your video call room
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requirePassword"
                checked={requirePassword}
                onCheckedChange={(checked) => setRequirePassword(checked as boolean)}
              />
              <Label
                htmlFor="requirePassword"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Require password for the room
              </Label>
            </div>
            {requirePassword && (
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Room Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
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
      </DialogContent>
    </Dialog>
  )
}