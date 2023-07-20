import React, { useEffect, useState } from "react";
import StatusCard from "../components/dashboardStatusCard";
import { instance } from "../api";

type Count =
  | [
      {
        label: string;
        quantity: number;
      }
    ]
  | [];

function Home() {
  const [animalCount, setAnimalCount] = useState<Count>([]);

  useEffect(() => {
    (async () => {
      let response = await instance.get("/GetAllAnimals");
      if (response.status === 200) {
        //set data to state
        let label = Object.keys(response.data.data);
        let quantity: Array<number> = Object.values(response.data.data);
        let total_quantity = 0;
        let data: [{ label: string; quantity: number }] = [
          {
            label: "total animals".toUpperCase(),
            quantity: 0,
          },
        ];
        for (let i = 0; i < label.length; i++) {
          let obj: { label: string; quantity: number } = {
            label: label[i].toUpperCase(),
            quantity: quantity[i],
          };
          total_quantity += quantity[i];
          data.push(obj);
        }
        data[0].quantity = total_quantity;
        setAnimalCount(data);
      } else {
      }
    })();
  }, []);

  return (
    <div className="flex flex-wrap m-3 w-full">
      {animalCount.length > 0 &&
        animalCount.map((item, key) => (
          <StatusCard label={item.label} quantity={item.quantity} key={key} />
        ))}
    </div>
  );
}

export default Home;
