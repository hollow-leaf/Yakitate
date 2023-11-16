import { Intro } from "@/components/home/Intro";
import dynamic from "next/dynamic";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("@/components/home/Map"), {
    ssr: false,
  });
  return (
    <div>
      <div className="flex justify-center h-auto w-screen flex-row grow">
        <div className="w-1/3 mx-auto">
          <Intro/>
        </div>
        <div className="w-1/3 mx-auto">
          <MapWithNoSSR />
        </div>
      </div>
    </div>
  )
}
