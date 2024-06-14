import { Suspense } from "react";
import EidPrayer from "./EidPrayer";
import Badge from "./Badge";
import { fetchEidPrayers } from "../actions/eid";

export default async function EidPrayerList() {
  const { query: eidPrayers, count } = await fetchEidPrayers();
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
            Eid prayer grounds <Badge text={count} />
          </h1>
          <ul className="flex flex-col gap-2 bg-white p-2 w-full">
            {eidPrayers.map((eidPrayer) => (
              <EidPrayer
                key={eidPrayer._id}
                time={eidPrayer.time}
                date={eidPrayer.date}
                imamName={eidPrayer.imamName}
              />
            ))}
          </ul>
        </div>
      ) : (
        <h3>No eid prayers</h3>
      )}
    </Suspense>
  );
}
