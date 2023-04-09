import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import NewRequest from "../../utils/NewRequest";
import OrderBoard from "../../components/orderBoard/OrderBoard";
import "./MyOrders.scss";

const MyOrders = () => {
  // Get my orders
  const { data: myOrderData, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const response = await NewRequest.get(`/orders/my-orders`);
      return response.data.data.reverse();
    },
  });

  return (
    <div className="myOrders">
      <div className="container">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <OrderBoard data={myOrderData} />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
