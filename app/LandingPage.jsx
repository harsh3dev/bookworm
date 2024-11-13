import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Bell, ShoppingBag, Brain } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import bgimg from '@/app/bgimg.webp'


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start  bg-yellow-100 w-full ">
      
      <main className="flex flex-col w-full justify-center items-center ">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden mx-auto flex flex-col items-center ">
          <Image
            src={bgimg}
            alt="Background of books"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 opacity-100 brightness-50 "
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#9fa4ff]">
                  Your Pocket Library
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Buy, read, and enjoy books anytime, anywhere. Get instant
                  notifications for new releases and special offers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link
                  href={"/sign-up"}
                  className="flex justify-center items-center"
                >
                  {/* <Input className="max-w-lg flex-1 bg-yellow-100 text-black" placeholder="Enter your email" type="email" /> */}
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500 p-6 ">
                    Get Started
                  </Button>
                </Link>
                <p className="text-xs text-slate-100">
                  Start your reading journey today. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-100  flex flex-col items-center ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black">
              Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-lg border-2 border-black">
                <div className="p-4 bg-yellow-400 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Buy Books</h3>
                <p className="text-gray-600">
                  Browse and purchase from our vast collection of books across
                  all genres. Enjoy competitive prices and frequent discounts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-lg border-2 border-black">
                <div className="p-4 bg-yellow-400 rounded-full">
                  <BookOpen className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">Read Anywhere</h3>
                <p className="text-gray-600">
                  Access your books on any device, anytime. Your library is
                  always with you, whether on your phone, tablet, or computer.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-lg border-2 border-black">
                <div className="p-4 bg-yellow-400 rounded-full">
                  <Bell className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">
                  Instant Notifications
                </h3>
                <p className="text-gray-600">
                  Get mobile alerts for new releases, special offers, and
                  personalized recommendations based on your reading
                  preferences.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-xl shadow-lg border-2 border-black">
                <div className="p-4 bg-yellow-400 rounded-full">
                  <Brain className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black">AI Summarizer</h3>
                <p className="text-gray-600">
                  Quickly grasp key concepts with our AI-powered book
                  summarizer. Get concise overviews of any book in your library.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-black text-yellow-400">
        <p className="text-xs">© 2024 BookWorm Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
