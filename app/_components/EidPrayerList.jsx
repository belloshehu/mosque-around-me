import { Suspense } from "react";
import EidPrayer from "./EidPrayer";
import Badge from "./Badge";
import { getAPIPayload } from "../utils/api";

export default async function EidPrayerList() {
  const res = await getAPIPayload("/api/eid");
  const eidPrayers = res.eidPrayers;
  return (
    <Suspense
      fallback={
        <div>
          <h3>Loading eid prayers</h3>
        </div>
      }>
      {eidPrayers ? (
        <div className="w-full max-h-[60vh] gap-3">
          <h1 className="font-semibold text-lg my-2 flex items-center gap-2">
            Eid prayer grounds <Badge text={eidPrayers.length} />
          </h1>
          <ul className="flex flex-col gap-2 bg-white p-2 w-full">
            {eidPrayers.map((eidPrayer) => (
              <EidPrayer key={eidPrayer._id} {...eidPrayer} />
            ))}
          </ul>
        </div>
      ) : (
        <h3>No eid prayers</h3>
      )}
    </Suspense>
  );
}
