import Image from "next/image";
import DistanceList from "./DistanceList";

const Map = () => {
  return (
    <div className="hidden md:visible md:inline w-full h-[30vh] md:h-[30vh] stick">
      <div className="w-full bg-purple-0 rounded-md border-[1px] h-full mb-2">
        <Image
          src={"/google-map.jpg"}
          alt="map"
          width={200}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <DistanceList />
    </div>
  );
};

export default Map;
