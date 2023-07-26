import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";
import { Animal, RegisterAnimalData } from "../types";
import ToastComponent from "../components/ToastComponent";
import { submitToast } from "../handlers";
import Loader from "../components/Loader";

function RegisterAnimal() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [number, setNumber] = useState<number[]>([]);
  const [load, setLoad] = useState<boolean | null>(null);
  const [data, setData] = useState<RegisterAnimalData>({
    type: 0,
    desc: "",
    number: 0,
    partPrice: "",
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

  const handleTypeChange = async (animalId: number) => {
    let response = await instance.get(
      "/GetAnimalNumberAvailableForRegisteration",
      {
        params: {
          AnimalId: animalId,
        },
      }
    );
    if (response.status === 200) {
      setNumber(response.data.data);
      setData((prevState) => ({
        ...prevState,
        type: animalId,
      }));
    }
  };

  const handleNumberChange = async (number: number) => {
    setData((prevState) => ({
      ...prevState,
      number: number,
    }));
  };
  const handlePriceChange = async (price: string) => {
    setData((prevState) => ({
      ...prevState,
      partPrice: price,
    }));
  };
  const handleDescChange = async (desc: string) => {
    setData((prevState) => ({
      ...prevState,
      desc: desc,
    }));
  };
  // console.log(data);

  const submit = async () => {
    try {
      const { desc, number, partPrice, type } = data;
      const response = await instance.post(`/AddAnimal/`, {
        type: type,
        number: number,
        partPrice: partPrice,
        desc: desc,
      });
      if (response.status === 200) {
        toast.success(response.data.data);
      } else {
        toast.error(response.data.errorMessage);
      }
      console.log(`post == `, response);
    } catch (err: any) {
      toast.error(err.response.data.errorMessage);
    }
  };

  if (animals.length > 0) <Loader />;
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            onChange={(e) => handleTypeChange(parseInt(e.target.value))}
          >
            <option defaultChecked defaultValue={0} selected disabled value={0}>
              Animal Type
            </option>
            {animals.map((animal) => (
              <option key={animal.animalId} value={animal.animalId}>
                {animal.type}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="day"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            // disabled={number.length < 0}
            onChange={(e) => handleNumberChange(parseInt(e.target.value))}
          >
            <option defaultValue={0} selected disabled value="">
              Animal Number
            </option>
            {number.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Part Price"
            onChange={(e) => handlePriceChange(e.target.value)}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-auto border border-themeBgDark rounded-xl px-2">
          <textarea
            rows={3}
            className="h-auto w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Any info about the animal"
            onChange={(e) => handleDescChange(e.target.value)}
          />
        </div>
        <button
          className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2"
          onClick={() => submitToast(submit)}
        >
          ADD
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Animal in the Stocks"
        title="Register Animal"
      />
      <ToastComponent />
    </div>
  );
}

export default RegisterAnimal;
