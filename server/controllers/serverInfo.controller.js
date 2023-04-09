import ServerInfo from "../models/serverInfo.model.js";

export const getMoneySever = async (req, res, next) => {
  try {
    const serverInfo = await ServerInfo.findOne()
    res.status(200).json({money: serverInfo.money});
  } catch (error) {
    next(error);
  }
};