import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='grid place-items-center place-content-center h-screen w-full '>
      <SignIn />
  </div>
}