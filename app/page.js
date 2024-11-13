import Image from "next/image";
import LandingPage from "./LandingPage";
import NewLandingPage from "@/components/NewLandingPage"


export default function Home() {
  return (
    <div className=" relative flex items-center justify-center w-full min-h-screen ">
      {/* <LandingPage/> */}
      <NewLandingPage/>
    </div>
  );
}
