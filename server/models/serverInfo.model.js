import mongoose from "mongoose";
const { Schema } = mongoose;

const serverInfoSchema = new Schema(
  {
    money: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ServerInfo", serverInfoSchema);
