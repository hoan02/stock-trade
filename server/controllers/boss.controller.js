import Boss from "../models/boss.model.js";


export const getMoneyBoss = async (req, res, next) => {
  try {
    const boss = await Boss.findOne()
    res.status(200).json({money: boss.money});
  } catch (error) {
    next(error);
  }
};