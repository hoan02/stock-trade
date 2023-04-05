import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { socket } from "../home/Home";
import NewRequest from "../../utils/NewRequest.js";
import ToastService from "../../utils/ToastService.js";
import "./CreateOrder.scss";

const CreateOrder = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const [total, setTotal] = useState(0);

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
        const userMatch = onlineUsers.find((user) => user.userId === idMatch);
        alert(JSON.stringify(onlineUsers));
        socket.emit("matchOrder", idMatch);
      } else {
        ToastService.success("Tạo lệnh mới thành công!");
      }
      navigate(`/`);
    },
  });

  const price = watch("price");
  const quantity = watch("quantity");
  useEffect(() => {
    const newTotal = parseFloat(price) * parseFloat(quantity);
    setTotal(newTotal.toFixed(2));
    // console.log(newTotal);
  }, [price, quantity]);

  return (
    <div className="order">
      <div className="container">
        <div className="form">
          <div className="title">Tạo lệnh</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="item">
              <div>Tên người tạo lệnh: {currentUser.username}</div>
            </div>
            <div className="item">
              <div>Tên cổ phiếu:</div>
              <input {...register("stock_name", { required: true })} />
              {errors.stock_name && (
                <span className="error">Không được để trống tên cổ phiếu!</span>
              )}
            </div>
            <div>Kiểu lệnh:</div>
            <select {...register("status")}>
              <option value="Buy">Mua</option>
              <option value="Sell">Bán</option>
            </select>
            <div className="item">
              <div>Giá:</div>
              <input
                type="number"
                {...register("price", { required: true })}
                step="0.01"
              />
              {errors.price && (
                <span className="error">Không được để trống giá!</span>
              )}
            </div>
            <div className="item">
              <div>Số lượng:</div>
              <input
                type="number"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="error" type="number">
                  Không được để trống số lượng!
                </span>
              )}
            </div>
            <div className="item">
              <div>Tổng:</div>
              <span>${total}</span>
            </div>
            <button className="btnSubmit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
