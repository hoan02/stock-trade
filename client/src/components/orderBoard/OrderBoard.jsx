import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

import "./OrderBoard.scss";

const OrderBoard = ({ data, columns }) => {
  const handleIconClick = (id) => {
    console.log(id);
    // TODO: Xử lý khi người dùng click vào icon
  };

  // Define the getRowClassName function
  const getRowClassName = (params) => {
    if (params.row.status === "Buy") {
      return "buyRow";
    }
    if (params.row.status === "Sell") {
      return "sellRow";
    }
    // if (params.row.isDone === true) {
    //   return "isDoneRow";
    // }
    // if (params.row.isDone === false) {
    //   return "notIsDoneRow";
    // }
    return "";
  };

  const stockData = data.map((item) => {
    return {
      id: item._id,
      trader: item.trader,
      stock_name: item.stock_name,
      status: item.status,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      state: item.state,
      datetime: moment(item.createdAt).format("HH:mm DD/MM/YYYY"),
    };
  });

  return (
    <div className="orderBoard" style={{ height: "100%", width: "100%" }}>
      <DataGrid
        className="dataGrid"
        rows={stockData}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        getRowClassName={getRowClassName}
        // checkboxSelection
      />
    </div>
  );
};

export default OrderBoard;
