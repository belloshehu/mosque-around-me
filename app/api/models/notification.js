import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notification title required"],
    },
    message: {
      type: String,
      minLength: [20, "Message too short"],
    },
    type: {
      type: String,
      enum: ["info", "danger", "warning"],
    },
    from: {
      type: mongoose.Types.ObjectId,
    },
    to: {
      type: [mongoose.Types.ObjectId],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
