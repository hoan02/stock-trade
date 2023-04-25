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

export const getMyOrderById = async (req, res, next) => {
  try {
    const orderDetails = await Order.findById(req.params.id);
    res.status(200).json({ data: orderDetails });
  } catch (error) {
    next(error);
  }
};

export const cancelMyOrderById = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const orderDetails = await Order.findByIdAndUpdate(req.params.id, {
      state: "canceled",
    });
    res.status(200).json(orderDetails);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    let oppositeStatus = req.body.status === "Buy" ? "Sell" : "Buy";
    const orderMatch = await Order.findOneAndUpdate(
      {
        stock_name: req.body.stock_name,
        price: req.body.price,
        quantity: req.body.quantity,
        status: oppositeStatus,
        state: "pending",
      },
      {
        state: "done",
        idMatch: req.userId,
      },
      { new: true }
    );
    let newOrder = {
      ...req.body,
      userId: req.userId,
    };
    if (orderMatch) {
      newOrder = {
        ...newOrder,
        state: "done",
        idMatch: orderMatch.userId,
        message:
          req.body.status === "Buy"
            ? `Bạn đã bán cổ phiếu ${req.body.stock_name} cho ${orderMatch.trader}!`
            : `Bạn đã mua cổ phiếu ${req.body.stock_name} từ ${orderMatch.trader}.`,
        messageMatch:
          req.body.status === "Buy"
            ? `Bạn đã mua cổ phiếu ${req.body.stock_name} từ ${req.body.trader}.`
            : `Bạn đã bán cổ phiếu ${req.body.stock_name} cho ${req.body.trader}!`,
      };

      const serverInfo = await ServerInfo.findOne();
      serverInfo.money += req.body.total * 0.1;
      serverInfo.money = Number(serverInfo.money.toFixed(2));
      await serverInfo.save();
    } else {
      newOrder = {
        ...newOrder,
        state: "pending",
        idMatch: "",
        message: "Tạo lệnh mới thành công!",
      };
    }
    await Order.create(newOrder);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
