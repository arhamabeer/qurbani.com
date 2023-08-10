import React, { useEffect, useState } from "react";
import StatusCard from "../components/dashboardStatusCard";
import { instance, instanceOAuth } from "../api";
import { HomeCount } from "../types";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { LOCAL_STORAGE_TOKEN } from "../constants";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  getAllAnimals,
  selectAnimal,
  selectAnimalResponses,
} from "../slice/animalSlice";
import { selectAdmin } from "../slice/adminSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const animalResponses = useSelector(selectAnimalResponses);
  const animals = useSelector(selectAnimal);
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  console.log("animals", animals, animalResponses);
  useEffect(() => {
    if (!animalResponses.tokenValidated) {
      navigate("/login");
    }
  }, [animalResponses]);
  useEffect(() => {
    (async () => {
      if (token == null) navigate("/login");
      else {
        try {
          dispatch(getAllAnimals(token));
        } catch (ex) {
          console.log("get all EX =>", ex);
        }
      }
    })();
  }, []);

  if (animals.length === 0) return <Loader />;

  return (
    <div className="flex flex-wrap m-3 w-full">
      {animals.length > 0 &&
        animals.map((item, key) => (
          <StatusCard label={item.label} quantity={item.quantity} key={key} />
        ))}
    </div>
  );
}

export default Home;
