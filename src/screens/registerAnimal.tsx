import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";
import { Animal, RegisterAnimalData } from "../types";
import ToastComponent from "../components/ToastComponent";
import { submitToast } from "../handlers";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  getAnimalNumberAvailableForRegisteration,
  getAnimalRegisteration,
  registerAnimal,
  resetAnimalNumberAvailableForRegisteration,
  resetResponse,
  selectAnimalNumberForReg,
  selectAnimalResponses,
  selectallAnimalsForReg,
} from "../slice/animalSlice";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { useNavigate } from "react-router";

function RegisterAnimal() {
  // const [number, setNumber] = useState<number[]>([]);
  const [data, setData] = useState<RegisterAnimalData>({
    type: 0,
    desc: "",
    number: "",
    partPrice: "",
  });
  const navigate = useNavigate();
  const animalResponse = useSelector(selectAnimalResponses);
  const animals = useSelector(selectallAnimalsForReg);
  const number = useSelector(selectAnimalNumberForReg);
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  useEffect(() => {
    (async () => {
      try {
        if (token !== null) dispatch(getAnimalRegisteration(token));
        else navigate("/login");
      } catch (err: any) {
        toast.error(err.response.data.errorMessage);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(animalResponse);
    if (animalResponse.animalRegistration) {
      setData({
        type: 0,
        desc: "",
        number: "",
        partPrice: "",
      });
      toast.success(animalResponse.message);
      dispatch(resetResponse());
      dispatch(resetAnimalNumberAvailableForRegisteration());
    } else if (
      !animalResponse.animalRegistration &&
      animalResponse.message !== ""
    ) {
      toast.error(animalResponse.message);
    }
  }, [animalResponse]);

  const handleTypeChange = async (animalId: number) => {
    if (token !== null) {
      let data = { token: token, animalId: animalId };
      dispatch(getAnimalNumberAvailableForRegisteration(data));
    } else navigate("/login");
    // let response = await instance.get(
    //   "/GetAnimalNumberAvailableForRegisteration",
    //   {
    //     params: {
    //       AnimalId: animalId,
    //     },
    //   }
    // );
    // if (response.status === 200) {
    //   setNumber(response.data.data);
    // }
    setData((prevState) => ({
      ...prevState,
      type: animalId,
    }));
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

  const submit = async () => {
    if (token !== null) {
      try {
        const { desc, number, partPrice, type } = data;
        if (
          number === "" ||
          partPrice === "" ||
          parseInt(partPrice) < 1 ||
          type === 0
        ) {
          toast.error("Every field is mandatory and must be valid!");
        } else {
          let sending_data = { ...data, token: token };
          dispatch(registerAnimal(sending_data));
        }
      } catch (err: any) {
        toast.error(err.response.data.errorMessage);
      }
    }
  };

  if (animals.length === 0) return <Loader />;
  else
    return (
      <div className="flex  justify-between">
        <div className="flex w-2/4 flex-col justify-center items-center">
          <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
            <select
              className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
              onChange={(e) => handleTypeChange(parseInt(e.target.value))}
              value={data.type}
            >
              <option
                defaultChecked
                defaultValue={0}
                selected
                disabled
                value={0}
              >
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
              name="number"
              className="h-full w-full bg-transparent text-themeBg"
              id=""
              // disabled={number.length < 0}
              onChange={(e) => handleNumberChange(parseInt(e.target.value))}
              value={data.number}
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
              value={data.partPrice}
            />
          </div>
          <div className="w-2/4 flex justify-center items-center my-2 h-auto border border-themeBgDark rounded-xl px-2">
            <textarea
              rows={3}
              className="h-auto w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
              placeholder="Any info about the animal"
              onChange={(e) => handleDescChange(e.target.value)}
              value={data.desc}
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
