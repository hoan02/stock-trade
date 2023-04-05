import mongoose from "mongoose";
const { Schema } = mongoose;

const bossSchema = new Schema(
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

export default mongoose.model("Boss", bossSchema);
