import { distances } from "../data";
import DistanceListItem from "./DistanceListItem";

const DistanceList = () => {
  return (
    <ul className="list-none m-0 p-0 flex items-center space-x-3">
      {distances.map((item) => (
        <DistanceListItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default DistanceList;
