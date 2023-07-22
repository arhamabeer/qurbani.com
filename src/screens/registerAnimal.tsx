import React, { useEffect, useState } from "react";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Animal = {
  animalId: number;
  type: string;
  memo: null | string;
  parts: number;
  animalDetails: [];
};

function RegisterAnimal() {
  const [animals, setAnimals] = useState<Animal[]>([]);

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
  console.log(animals);

  if (animals.length === 0) return <h1>LOADING....</h1>;
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder">
            <option defaultChecked selected disabled value={0}>
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
          >
            <option defaultChecked disabled value="">
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
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-auto border border-themeBgDark rounded-xl px-2">
          <textarea
            rows={3}
            className="h-auto w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Any info about the animal"
          />
        </div>
        <button className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2">
          ADD
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Animal in the Stocks"
        title="Register Animal"
      />
    </div>
  );
}

export default RegisterAnimal;
