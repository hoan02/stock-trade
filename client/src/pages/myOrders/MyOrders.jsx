import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

import iconClose from "../../assets/images/close.png";
import Details from "../../components/details/Details";
import NewRequest from "../../utils/NewRequest";
import OrderBoard from "../../components/orderBoard/OrderBoard";
import { columns } from "../../utils/configColumns";
import "./MyOrders.scss";

const MyOrders = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataDetails, setDataDetails] = useState();
  const [isShowDetails, setIsShowDetails] = useState(false);

  const handleExit = () => {
    console.log("ok");
    setIsShowDetails(false);
  };

  const newColumns = [
    ...columns,
    {
      field: "details",
      cellClassName: "detailsCell",
      headerName: "Chi tiết",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={async () => {
            const res = await NewRequest.get(`/orders/my-orders/${params.id}`);
            // navigate(`${params.id}`);
            setDataDetails(res.data.data);
            setIsShowDetails(true);
          }}
        >
          <SettingsIcon />
        </IconButton>
      ),
    },
  ];

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
        {isShowDetails && (
          <div className="detail">
            <Details data={dataDetails} />
            <div className="close" onClick={handleExit}>
              <img src={iconClose} alt="" />
            </div>
          </div>
        )}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <OrderBoard
            className="orderBoard"
            data={myOrderData}
            columns={newColumns}
          />
        )}
      </div>
    </div>
  );
};

export default MyOrders;
