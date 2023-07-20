import DistanceList from "./DistanceList";

const Map = () => {
  return (
    <div className="hidden md:visible md:inline w-full h-[30vh] md:h-[60vh] stick">
      <div className="w-full bg-purple-0 rounded-md border-[1px] h-full mb-2">
        map
      </div>
      <DistanceList />
    </div>
  );
};

export default Map;
