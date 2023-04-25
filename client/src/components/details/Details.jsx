import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewRequest from "../../utils/NewRequest";
import ToastService from "../../utils/ToastService.js";
import "./Details.scss";
import { socket } from "../../pages/Home/Home";
import { useNavigate } from "react-router-dom";

const Details = ({ data, setIsShowDetails }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (id) => {
      NewRequest.put(`orders/my-orders/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      // console.log(res);
      // socket.emit("newOrder");
      navigate(`/`);
      setIsShowDetails(false);
      ToastService.success(`Bạn đã hủy lệnh!`);
    },
  });

  const handleCancel = async () => {
    updateMutation.mutate(data._id);
  };

  return (
    <div className="details">
      <div className="container">
        <div className="content">
          <div className="title">
            <h1>Chi tiết</h1>
          </div>
          <div className="item">
            <div className="lable">Id: </div>
            <div className="value">{data._id}</div>
          </div>
          <div className="item">
            <div className="lable">Người tạo lệnh: </div>
            <div className="value">{data.trader}</div>
          </div>
          <div className="item">
            <div className="lable">Tên cổ phiếu: </div>
            <div className="value">{data.stock_name}</div>
          </div>
          <div className="item">
            <div className="lable">Trạng thái: </div>
            <div className="value">{data.status}</div>
          </div>
          <div className="item">
            <div className="lable">Giá (1/cp): </div>
            <div className="value">{data.price}</div>
          </div>
          <div className="item">
            <div className="lable">Số lượng: </div>
            <div className="value">{data.quantity}</div>
          </div>
          <div className="item">
            <div className="lable">Tổng: </div>
            <div className="value">{data.total}</div>
          </div>
          {/* <div className="item">
            <div className="lable">UserId: </div>
            <div className="value">{data.userId}</div>
          </div> */}
          <div className="item">
            <div className="lable">Tình trạng: </div>
            <div className="value">{data.state}</div>
          </div>
          {data.idMatch && (
            <div className="item">
              <div className="lable">Id match: </div>
              <div className="value">{data.idMatch}</div>
            </div>
          )}
          {data.state === "pending" && (
            <div>
              <div className="item">
                <button className="cancel" onClick={handleCancel}>
                  Hủy lệnh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
