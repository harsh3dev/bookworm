import React from 'react'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

import { Button } from "@/components/ui/button"
import { BookOpen, Heart } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-fit flex items-center py-4 text-black bg-yellow-500 w-full">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">BookWorm</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href={'/moody'}>
            <Button className="flex items-center justify-center gap-6 p-6 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-all duration-300 ">
              Moody Reader
            </Button>
          </Link>
        <SignedIn>
          <Link className="" href="/books/saved">
            <Button className=" p-6 flex justify-center items-center gap-2 ">
                <Heart className="h-4 w-4" />
                Saved
            </Button>
          </Link>
          </SignedIn>
          <Link className="" href="/books">
            <Button className=" p-6  ">Books</Button>
          </Link>
          
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
  )
}
