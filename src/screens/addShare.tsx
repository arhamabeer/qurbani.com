import React, { useEffect, useState } from "react";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";
import { Animal, AvailableAnimalsForDeal, DealingData } from "../types";
import Loader from "../components/Loader";
import { submitToast } from "../handlers";
import { toast } from "react-toastify";
import ToastComponent from "../components/ToastComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import {
  confirmDealing,
  getAnimalNumberAvailableForDealing,
  getAnimalRegisteration,
  resetAvailableAnimals,
  selectAnimalForIssue,
  selectAnimalNumberForIssue,
  selectIssueResponses,
} from "../slice/shareSlice";
import { useNavigate } from "react-router-dom";

function AddShare() {
  const [animalId, setAnimalId] = useState<string | number>("");
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [data, setData] = useState<DealingData>({
    Name: "",
    Contact: "",
    EmergencyContact: "",
    Address: "",
    Nic: "",
    Description: "-",
    QurbaniDay: "",
    PartId: "",
    AdId: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const animals = useSelector(selectAnimalForIssue);
  const issueResponses = useSelector(selectIssueResponses);
  const AvailableAnimals: AvailableAnimalsForDeal = useSelector(
    selectAnimalNumberForIssue
  );
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  let price =
    selectedAnimal !== null
      ? AvailableAnimals.filter((e) => e.adId === selectedAnimal)[0].price
      : 0;

  useEffect(() => {
    if (issueResponses.shareRegistration && issueResponses.message !== "") {
      setSelectedAnimal(null);
      dispatch(resetAvailableAnimals());
      setData({
        Name: "",
        Contact: "",
        EmergencyContact: "",
        Address: "",
        Nic: "",
        Description: "",
        QurbaniDay: "",
        PartId: "",
        AdId: "",
      });
      setAnimalId("");
      toast.success(issueResponses.message);
      if (token !== null) dispatch(getAnimalRegisteration(token));
      else navigate("/login");
    }
  }, [issueResponses]);
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

  const handleDataChange = (target: string, value: string | number) => {
    setData((prev) => ({
      ...prev,
      [target]: value,
    }));
  };
  const handleTypeChange = async (animalId: number) => {
    try {
      if (token !== null) {
        let data = { token: token, animalId: animalId };
        setAnimalId(animalId);
        dispatch(getAnimalNumberAvailableForDealing(data));
      } else navigate("/login");

      // if (response.status === 200) {
      //   let animals = response.data.data.sort(
      //     (a: any, b: any) => a.number - b.number
      //   );
      //! setAvailableAnimals(animals);
      // }
    } catch (err: any) {
      toast.error(err.response.data.errorMessage);
    }
  };

  const submit = async () => {
    // console.log("DATA => ", data);
    if (token !== null) {
      try {
        let {
          AdId,
          Address,
          Contact,
          EmergencyContact,
          Name,
          Nic,
          PartId,
          QurbaniDay,
        } = data;

        if (
          AdId === "" ||
          Address === "" ||
          Contact === "" ||
          EmergencyContact === "" ||
          Name === "" ||
          Nic === "" ||
          PartId === "" ||
          QurbaniDay === ""
        ) {
          toast.error("Every field is mandatory and must be valid!");
        } else {
          let sending_data = { data: data, token: token };
          dispatch(confirmDealing(sending_data));
          let response = await instance.post("/ConfirmDealing", data);
          if (response.status === 200) {
            // setData({
            //   Name: "",
            //   Contact: "",
            //   EmergencyContact: "",
            //   Address: "",
            //   Nic: "",
            //   Description: "",
            //   QurbaniDay: "",
            //   PartId: "",
            //   AdId: "",
            // });
            // setAnimalId("");
            //!   setAvailableAnimals([]);
            // setSelectedAnimal(null);
            // toast.success(response.data.data);
            // let response1 = await instance.get("/GetAnimalRegisteration");
            // if (response1.status === 200) {
            //set data to state
            //! setAnimals(response1.data.data);
            // }
          } else {
            toast.error(response.data.errorMessage);
          }
        }
        // console.log(`post === `, response);
      } catch (err: any) {
        toast.error(err.response.data.errorMessage);
      }
    }
  };
  console.log(AvailableAnimals, selectedAnimal);

  if (animals.length === 0) return <Loader />;

  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center mb-5 mt-[-10rem] h-20 ">
          <h1 className="text-2xl underline decoration-themeBgDark">
            Total Cost: {price}
            <span className="text-themeBg font-bold"></span>
          </h1>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="animal"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            onChange={(e) => handleTypeChange(parseInt(e.target.value))}
            value={animalId}
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
          <select
            name="number"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            disabled={AvailableAnimals.length === 0}
            onChange={(e) => {
              handleDataChange("AdId", parseInt(e.target.value));
              setSelectedAnimal(parseInt(e.target.value));
            }}
            // value={
            //   AvailableAnimals.length > 0 && selectedAnimal !== null
            //     ? AvailableAnimals.filter((e) => e.adId === selectedAnimal)[0]
            //         .number
            //     : ""
            // }
          >
            <option defaultChecked selected disabled value="">
              Select Animal Number
            </option>
            {AvailableAnimals.map((animal) => (
              <option key={animal.adId} value={animal.adId}>
                {animal.number}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="part"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            disabled={selectedAnimal === null}
            onChange={(e) =>
              handleDataChange("PartId", parseInt(e.target.value))
            }
            value={data.PartId}
          >
            <option defaultChecked selected disabled value="">
              Select Animal Part
            </option>
            {AvailableAnimals.filter((e) => e.adId === selectedAnimal).map(
              (animal) =>
                animal.parts.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))
            )}
          </select>
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Person Name..."
            onChange={(e) => handleDataChange("Name", e.target.value)}
            value={data.Name}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Address..."
            onChange={(e) => handleDataChange("Address", e.target.value)}
            value={data.Address}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Contact Number..."
            onChange={(e) => handleDataChange("Contact", e.target.value)}
            value={data.Contact}
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
            value={data.EmergencyContact}
          />
        </div>
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <input
            type="number"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="NIC (without dashes) e.g: 4220112345678"
            onChange={(e) => handleDataChange("Nic", e.target.value)}
            value={data.Nic}
          />
        </div>

        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl px-2">
          <select
            name="day"
            className="h-full w-full bg-transparent text-themeBg"
            id=""
            onChange={(e) =>
              handleDataChange("QurbaniDay", parseInt(e.target.value))
            }
            value={data.QurbaniDay}
          >
            <option defaultChecked selected disabled value="">
              Qurbani Day
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <button
          className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark rounded-xl px-2"
          onClick={() => submitToast(submit)}
        >
          REGISTER
        </button>
      </div>
      <AuthBanner
        action={9}
        text="Add a new Share for the Animal"
        title="Register Share"
      />
      <ToastComponent />
    </div>
  );
}

export default AddShare;
