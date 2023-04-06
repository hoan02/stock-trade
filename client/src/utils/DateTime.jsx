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
    <div className="date-time" style={{ color: "#f7941d", fontSize: 14 }}>
      <span style={{ fontWeight: "600" }}>{time.format("HH:mm:ss")} </span>
      <span> {time.format("DD/MM/YYYY")}</span>
    </div>
  );
}

export default DateTime;
