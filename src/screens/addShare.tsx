import React, { useEffect, useState } from "react";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";
import { Animal, DealingData } from "../types";

function AddShare() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [AnimalId, setAnimalId] = useState<number>();
  const [data, setData] = useState<DealingData>({
    Name: "",
    Contact: "",
    EmergencyContact: "",
    Address: "",
    Nic: "",
    Descrption: "",
    QurbaniDay: 0,
  });

  useEffect(() => {
    (async () => {
      let response = await instance.get("/GetAnimalRegisteration");
      if (response.status === 200) {
        //set data to state
        setAnimals(response.data.data);
      } else {
      }
    })();
  }, []);

  const handleDataChange = (target: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  console.log("DATA => ", data, AnimalId);

  if (animals.length === 0) return <h1>LOADING....</h1>;

  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center mb-5 mt-[-10rem] h-20 ">
          <h1 className="text-2xl underline decoration-themeBgDark">
            Total Cost:{" "}
            <span className="text-themeBg font-bold">PKR 20000</span>
          </h1>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="animal"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            onChange={(e) => setAnimalId(parseInt(e.target.value))}
          >
            <option defaultChecked selected disabled value="">
              Select Animal
            </option>
            {animals.map((animal) => (
              <option key={animal.animalId} value={animal.animalId}>
                {animal.type}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Person Name..."
            onChange={(e) => handleDataChange("Name", e.target.value)}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Address..."
            onChange={(e) => handleDataChange("Address", e.target.value)}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Contact Number..."
            onChange={(e) => handleDataChange("Contact", e.target.value)}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Emergency Contact Number..."
            onChange={(e) =>
              handleDataChange("EmergencyContact", e.target.value)
            }
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="NIC (without dashes) e.g: 4220112345678"
            onChange={(e) => handleDataChange("Nic", e.target.value)}
          />
        </div>

        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="day"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            onChange={(e) => handleDataChange("QurbaniDay", e.target.value)}
          >
            <option defaultChecked selected disabled value="">
              Qurbani Day
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <button className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2">
          REGISTER
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Share for the Animal"
        title="Register Share"
      />
    </div>
  );
}

export default AddShare;
