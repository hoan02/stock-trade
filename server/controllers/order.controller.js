import Order from "../models/order.model.js";
import Boss from "../models/boss.model.js";

export const getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await Order.find({});
    res.status(200).json({ data: allOrder });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    let oppositeStatus = req.body.status === "Buy" ? "Sell" : "Buy";
    const updatedOrder = await Order.findOneAndUpdate({
      stock_name: req.body.stock_name,
      price: req.body.price,
      quantity: req.body.quantity,
      status: oppositeStatus,
      isDone: false,
    },
    {
      isDone: true,
    },
    { new: true });
    if (updatedOrder) {
      await Order.create({
        ...req.body,
        isDone: true,
      })

      const boss = await Boss.findOne();
      boss.money += req.body.total * 0.1;
      boss.money = Number(boss.money.toFixed(2));
      await boss.save();

      res.status(200).json({ 
        isDone: true,
        idMatch: updatedOrder.userId,
      });
    } else {
      await Order.create({
        ...req.body,
      });
      res.status(200).json({ isDone: false });
    }
  } catch (error) {
    next(error);
  }
};
