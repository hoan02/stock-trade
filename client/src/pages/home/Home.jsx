import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

import NewRequest from "../../utils/NewRequest.js";
import ToastService from "../../utils/ToastService.js";
import OrderBoard from "../../components/orderBoard/OrderBoard.jsx";
import "./Home.scss";

export const socket = io.connect("http://localhost:8900");

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [total, setTotal] = useState(0);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (currentUser) socket.emit("addUser", currentUser._id);
  }, []);

  useEffect(() => {
    socket.on("getMessage", ({ message }) => {
      console.log(message);
      ToastService.success(message, 1);
    });
  }, [socket]);

  // Get moneyBoss
  const { data: moneyBoss, isLoading: isLoadingMoney } = useQuery({
    queryKey: ["moneyBoss"],
    queryFn: async () => {
      const response = await NewRequest.get(`/boss/money`);
      return response.data.money;
    },
  });

  // Get all order
  const { data: allOrder, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await NewRequest.get(`/orders`);
      return response.data.data.reverse();
    },
  });

  // Create new order
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const price = watch("price");
  const quantity = watch("quantity");
  useEffect(() => {
    const newTotal = parseFloat(price) * parseFloat(quantity);
    setTotal(newTotal.toFixed(2));
  }, [price, quantity]);

  const onSubmit = async (data) => {
    const dataReq = {
      ...data,
      userId: currentUser._id,
      total,
      trader: currentUser.username,
    };
    createMutation.mutate(dataReq);
  };

  const createMutation = useMutation({
    mutationFn: (dataReq) => {
      return NewRequest.post(`/orders`, dataReq);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
      socket.emit("newOrder");
      const isDone = data.data.isDone;
      const idMatch = data.data.idMatch;
      if (isDone) {
        ToastService.success(idMatch);
        socket.emit("matchOrder", idMatch);
      } else {
        ToastService.success("Tạo lệnh mới thành công!");
      }
    },
  });

  return (
    <div className="home">
      <div className="container">
        <div className="menu">
          <div className="boss">
            <div className="title">Sever</div>
            <p className="money">${moneyBoss}</p>
          </div>
          <div className="formOrder">
            <div className="line"></div>
            {currentUser && (
              <div className="form">
                <div className="title">Order</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <div className="item">
                    <div>Người tạo lệnh: {currentUser.username}</div>
                  </div> */}
                  <div className="item">
                    <div>Tên cổ phiếu:</div>
                    <input
                      className={errors.stock_name ? "error" : ""}
                      {...register("stock_name", { required: true })}
                    />
                  </div>
                  <div className="item">
                    <div>Kiểu lệnh:</div>
                    <span className={errors.status ? "error" : ""}></span>
                    <span className="radio">
                      <input
                        {...register("status", { required: true })}
                        type="radio"
                        value="Buy"
                      />
                      Buy
                    </span>
                    <span className="radio">
                      <input
                        {...register("status", { required: true })}
                        type="radio"
                        value="Sell"
                      />
                      Sell
                    </span>
                  </div>
                  <div className="item">
                    <div>Giá:</div>
                    <input
                      className={errors.price ? "error" : ""}
                      type="number"
                      {...register("price", { required: true })}
                      step="0.01"
                    />
                  </div>
                  <div className="item">
                    <div>Số lượng:</div>
                    <input
                      className={errors.quantity ? "error" : ""}
                      type="number"
                      {...register("quantity", { required: true })}
                    />
                  </div>
                  <div className="item">
                    <div>Tổng:</div>
                    <span>${total}</span>
                  </div>
                  <div className="btnSubmit">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="orderBoard">
          {isLoading ? (
            <div className="">
              <h1>Loading...</h1>
            </div>
          ) : (
            <OrderBoard data={allOrder} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
