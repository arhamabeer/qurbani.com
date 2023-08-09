import React, { useEffect, useState } from "react";
import StatusCard from "../components/dashboardStatusCard";
import { instance, instanceOAuth } from "../api";
import { HomeCount } from "../types";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { useNavigate } from "react-router";

function Home() {
  const [animalCount, setAnimalCount] = useState<HomeCount>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  useEffect(() => {
    (async () => {
      try {
        if (token == null) navigate("/login");
        else {
          const axiosAuth = instanceOAuth(token);
          let response = await axiosAuth.get("/GetAllAnimals");
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
            toast.error(response.data.errorMessage);
          }
        }
      } catch (err: any) {
        toast.error(err.response.data.errorMessage);
        if (err.response.status === 401) {
          localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        }
      }
    })();
  }, []);

  if (animalCount.length === 0) return <Loader />;

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
