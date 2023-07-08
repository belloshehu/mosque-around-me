import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: [true, "user ID required"],
    },
    service: {
      // Id for the service being subscribed for
      type: mongoose.Types.ObjectId,
      required: [true, "service ID required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
