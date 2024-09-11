import React from 'react'
import SignupForm from './SignupForm'
import Image from 'next/image'
import bgimg2 from "@/app/bookbg2.webp"

const page = () => {
  return (
    <div className=" relative flex items-center justify-center w-full min-h-screen bg-white ">
        <Image
            src={bgimg2}
            alt="Background of books"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0 opacity-100 brightness-50 "
          />
      <SignupForm/>
    </div>
  )
}

export default page
