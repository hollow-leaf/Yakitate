import { Intro } from "@/components/home/Intro";
import { Intro } from "@/components/home/Intro";
import dynamic from "next/dynamic";
import Image from "next/image";
export default function Home() {
  const MapWithNoSSR = dynamic(() => import("@/components/home/Map"), {
    ssr: false,
  });
  return (
    <div>
      <div className="flex justify-center mt-10 mb-10 h-auto w-screen flex-row grow">
        <div className="w-1/3 mx-auto">
          <Intro/>
        </div>
        <div className="w-1/3 mx-auto">
          <Image src={"architecture.jpg"} alt="architecture" width={600} height={1000} />
          <br/>
          <MapWithNoSSR />
       </div>
      </div>
    </div>
  )
}
