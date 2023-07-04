import Mosque from "./Eid";
import { getMosques } from "../utils/api";

const MosqueList = async () => {
  const mosques = await getMosques();

  return (
    <section className="grid text-center grid-cols-1 lg:grid-cols-4 gap-4 w-full my-5 lg:my-10">
      {mosques ? (
        mosques.map((mosque) => <Mosque key={mosque._id} {...mosque} />)
      ) : (
        <p className="text-center">No mosques found</p>
      )}
    </section>
  );
};

export default MosqueList;
