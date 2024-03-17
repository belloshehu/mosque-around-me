import dbConnect from "./dbConnect";
import Prayer from "../models/prayer";
import mongoose from "mongoose";

const getPrayerSubscribers = async (prayerId) => {
  await dbConnect();
  const result = await Prayer.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(prayerId),
      },
    },

    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "service",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
        ],
        as: "subscribers",
      },
    },
    {
      $project: {
        service: 0,
        "subscribers._id": 0,
        "subscribers.mosque": 0,
        "subscribers.service": 0,
        "subscribers.createdAt": 0,
        "subscribers.updatedAt": 0,
        "subscribers.__v": 0,
        "subscribers.user.updatedAt": 0,
        "subscribers.user.createdAt": 0,
      },
    },
  ]);
  return result[0].subscribers;
};
export const getSubscribersInfo = async (prayerId) => {
  try {
    const subscribers = await getPrayerSubscribers(prayerId);
    const subscribersBasicInfo = subscribers.map(
      ({ user: { firstName, otherName, email, phoneNumber } }) => ({
        firstName,
        otherName,
        email,
        phoneNumber,
      })
    );
    return subscribersBasicInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubscribersEmailOnly = async (prayerId) => {
  try {
    const subscribers = await getPrayerSubscribers(prayerId);
    const subscribersBasicInfo = subscribers.map(
      ({ user: { email } }) => email
    );
    return subscribersBasicInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubscribersIds = async (prayerId) => {
  try {
    const subscribers = await getPrayerSubscribers(prayerId);
    const subscribersIds = subscribers.map(({ user: { _id } }) => _id);
    return subscribersIds;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubscribersPhoneNunmberOnly = async (prayerId) => {
  try {
    const subscribers = await getPrayerSubscribers(prayerId);
    const subscribersBasicInfo = subscribers.map(
      ({ user: { phoneNumber } }) => phoneNumber
    );
    return subscribersBasicInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};
