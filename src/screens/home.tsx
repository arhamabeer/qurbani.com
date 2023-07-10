import React from "react";
import StatusCard from "../components/dashboardStatusCard";

const data = [
  {
    label: "Total Animals",
    quantity: 251,
  },
  {
    label: "Total Cows",
    quantity: 151,
  },
  {
    label: "Total Goats",
    quantity: 99,
  },
  {
    label: "Total Camels",
    quantity: 1,
  },
];
function Home() {
  return (
    <div className="flex flex-wrap m-3 w-full">
      {data.map((item, key) => (
        <StatusCard label={item.label} quantity={item.quantity} key={key} />
      ))}
    </div>
  );
}

export default Home;
