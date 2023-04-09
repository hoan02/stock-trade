export const columns = [
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