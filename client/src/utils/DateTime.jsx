import React, { useState, useEffect } from "react";
import moment from "moment";

function DateTime() {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="date-time">
      {time.format("HH:mm:ss")}, ngày
      {time.format(" DD ")}
      tháng
      {time.format(" MM ")}
      năm
      {time.format(" YYYY")}
    </div>
  );
}

export default DateTime;
