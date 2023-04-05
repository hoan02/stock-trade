import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";

import NewRequest from "../../utils/NewRequest.js";
import ToastService from "../../utils/ToastService.js";
import OrderBoard from "../../components/orderBoard/OrderBoard";
import "./Home.scss";

export const socket = io.connect("http://localhost:8900");

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [moneyBoss, setMoneyBoss] = useState(0);

  NewRequest.get(`/boss/money`)
    .then((response) => {
      setMoneyBoss(response.data.money);
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    socket.on("newOrder", () => {
      queryClient.invalidateQueries(["orders"]);
    });
  }, [queryClient]);

  useEffect(() => {
    socket.on("getMessage", ({ message }) => {
      ToastService.success(message);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("matchOrder", () => {
      NewRequest.get(`/boss`)
        .then((response) => {
          setMoneyBoss(response.data.moneyBoss);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [socket]);

  const handleClickOrder = () => {
    if (!currentUser) {
      return navigate(`/login`);
    }
    navigate(`/orders`);
  };

  // Get all order
  const { data: allOrder, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await NewRequest.get(`/orders`);
      return response.data.data.reverse();
    },
  });

  return (
    <div className="home">
      <div className="container">
        <div className="order">
          <div className="btnOrder" onClick={handleClickOrder}>
            Order
          </div>
          <div className="boss">
            Boss: <span className="money">${moneyBoss}</span>
          </div>
        </div>
        <div className="orderBoard">
          <div className="title">Danh sách các lệnh</div>
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
