import dynamic from "next/dynamic";

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("@/components/home/Map"), {
    ssr: false,
  });
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 mx-4">

        </div>
        <div className="w-1/4 mx-2">
          <MapWithNoSSR />
        </div>
      </div>
    </div>
  )
}
