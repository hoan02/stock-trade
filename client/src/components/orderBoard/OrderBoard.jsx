import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import "./OrderBoard.scss";

const columns = [
  {
    field: "stock_name",
    headerClassName: "stockName",
    cellClassName: "stockNameCell",
    headerName: "Tên CP",
    width: 100,
  },
  {
    field: "status",
    cellClassName: "statusCell",
    headerName: "Trạng thái",
    width: 86,
  },
  {
    field: "trader",
    cellClassName: "traderCell",
    headerName: "Người tạo lệnh",
    width: 120,
  },
  {
    field: "price",
    cellClassName: "priceCell",
    headerName: "Giá (1 CP)",
    type: "number",
    width: 120,
  },
  {
    field: "quantity",
    cellClassName: "quantityCell",
    headerName: "Số lượng",
    type: "number",
    width: 120,
  },
  {
    field: "total",
    cellClassName: "totalCell",
    headerName: "Tổng (USD)",
    type: "number",
    width: 150,
  },
  {
    field: "datetime",
    cellClassName: "datetimeCell",
    headerName: "Thời điểm tạo lệnh",
    width: 180,
  },
  {
    field: "id",
    headerClassName: "id",
    cellClassName: "idCell",
    headerName: "ID",
    width: 300,
  },
  {
    field: "isDone",
    cellClassName: "isDoneCell",
    headerName: "Done",
    width: 50,
  },
];

const OrderBoard = ({ data }) => {
  // console.log(data);

  // Define the getRowClassName function
  const getRowClassName = (params) => {
    if (params.row.status === "Buy") {
      return "buyRow";
    }
    if (params.row.status === "Sell") {
      return "sellRow";
    }
    if (params.row.isDone === true) {
      return "isDoneRow";
    }
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
      isDone: item.isDone?"✔":"✘",
      datetime: moment(item.createdAt).format("HH:mm DD/MM/YYYY"),
    };
  });

  return (
    <div className="orderBoard" style={{ height: "100%", width: "100%" }}>
      <DataGrid
        className="dataGrid"
        rows={stockData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowClassName={getRowClassName}
        // checkboxSelection
      />
    </div>
  );
};

export default OrderBoard;
