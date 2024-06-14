import { cn, getExternalAPIPayload } from "../utils/api";
import { Suspense } from "react";
const renderedDate = (date) => {
  if (!date) return null;
  return (
    <div className="w-full">
      <strong className="absolute -top-1 right-0 bg-white p-1 shadow-2xl text-primary w-full text-center">
        {date?.date} AH {date?.month?.ar}
      </strong>
      <div className="bg-primary p-2 px-5 shadow-md rounded-sm text-center w-full text-white">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white">
          {date.day}
        </h1>
        <h1>{date?.month?.en}</h1>
      </div>
    </div>
  );
};

export default async function IslamicDate({ className }) {
  const isoDateString = new Date().toISOString();
  const [y, m, dStr] = isoDateString.split("-");
  const d = dStr.split("T")[0];
  const gregorianDate = `${d}-${m}-${y}`;

  const response = await getExternalAPIPayload(
    `https://api.aladhan.com/v1/gToH/${gregorianDate}`
  );
  const date = response?.data?.hijri;

  return (
    <div
      className={cn(
        "relative rounded-md py-5 flex flex-col gap-5 justify-center items-center w-full",
        className
      )}>
      <Suspense
        fallback={
          <div>
            <h1>Loading date</h1>
          </div>
        }>
        {date ? renderedDate(date) : <h1>No date</h1>}
      </Suspense>
    </div>
  );
}
