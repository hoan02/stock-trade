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
    isDone:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
