import Order from "../models/order.model.js";
import ServerInfo from "../models/serverInfo.model.js";

export const getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await Order.find({});
    res.status(200).json({ data: allOrder });
  } catch (error) {
    next(error);
  }
};

export const getMyOrder = async (req, res, next) => {
  try {
    const myOrder = await Order.find({
      userId: req.userId,
    });
    res.status(200).json({ data: myOrder });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    let oppositeStatus = req.body.status === "Buy" ? "Sell" : "Buy";
    const orderMatch = await Order.findOneAndUpdate({
      stock_name: req.body.stock_name,
      price: req.body.price,
      quantity: req.body.quantity,
      status: oppositeStatus,
      isDone: false,
    },
    {
      isDone: true,
      idMatch: req.userId,
    },
    { new: true });
    let newOrder = {
      ...req.body,
      userId: req.userId,
    }
    if (orderMatch) {
      newOrder = {...newOrder, isDone: true, idMatch: orderMatch.userId}

      const serverInfo = await ServerInfo.findOne();
      serverInfo.money += req.body.total * 0.1;
      serverInfo.money = Number(serverInfo.money.toFixed(2));
      await serverInfo.save();
    } else {
      newOrder = {...newOrder, isDone: false, idMatch: ''}
    }
    await Order.create(newOrder);
    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
};
