import dbConnect from "../api/lib/dbConnect";
import EidPrayerModel from "../api/models/eidPrayer";

export const fetchEidPrayers = async () => {
  try {
    await dbConnect();
    const query = await EidPrayerModel.find();
    return { query, count: query.length };
  } catch (error) {
    throw new Error("Failed to query eid prayers", error);
  }
};
