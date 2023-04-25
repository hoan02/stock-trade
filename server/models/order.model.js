import mongoose from "mongoose";
const { Schema } = mongoose;


const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      // unique: true,
    },
    trader: {
      type: String,
      required: true,
    },
    stock_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    },
    total:{
      type: Number,
      required: true,
    },
    state:{
      type: String,
      required: false,
      default: "pending",
    },
    idMatch:{
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
