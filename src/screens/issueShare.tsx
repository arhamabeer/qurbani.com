import React, { useState } from "react";
import AuthBanner from "../components/authBanner";
import { instance } from "../api";
import { NicData } from "../types";

function IssueShare() {
  const [nic, setNic] = useState("");
  const [nicData, setNicData] = useState<NicData>({
    name: "",
    contact: "",
    emergencyContact: "",
    address: "",
    nic: "",
    adId: 0,
    partId: 0,
    qurbaniDay: 0,
    description: "",
    dealId: 0,
    pickedUp: false,
    personId: 0,
    price: 0,
    finalPrice: 0,
    animalType: "",
    number: 0,
  });

  const handleFind = async () => {
    const response = await instance.get("/GetDealOfPerson", {
      params: {
        nic: nic,
      },
    });
    setNicData(response.data.data);
  };

  const handleIssue = async () => {
    let data = {
      dealId: nicData.dealId,
      personId: nicData.personId,
    };
    const response = await instance.post("/IssueDealToPerson", data);
    // setNicData(response.data.data);
    console.log("Issue", response);
  };

  console.log("data", nicData);
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-4/5 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl pl-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Enter Share ID..."
            onChange={(e) => setNic(e.target.value)}
          />
          <button
            className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark  rounded-r-xl  px-2"
            onClick={() => handleFind()}
          >
            Find
          </button>
        </div>
        <div
          style={
            nicData.name === ""
              ? { display: "none" }
              : {
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }
          }
        >
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Name:{" "}
              <span className="text-themeBg font-bold">{nicData.name}</span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Address:{" "}
              <span className="text-themeBg font-bold">{nicData.address}</span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Contact:{" "}
              <span className="text-themeBg font-bold">{nicData.contact}</span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Emergency Contact:{" "}
              <span className="text-themeBg font-bold">
                {nicData.emergencyContact}
              </span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Animal:{" "}
              <span className="text-themeBg font-bold">
                {nicData.animalType}
              </span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Animal Number:{" "}
              <span className="text-themeBg font-bold">{nicData.number}</span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Part:{" "}
              <span className="text-themeBg font-bold">{nicData.partId}</span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Qurbani Day:{" "}
              <span className="text-themeBg font-bold">
                {nicData.qurbaniDay}
              </span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2">
            <h1 className="text-2xl">
              Picked:{" "}
              <span className="text-themeBg font-bold">
                {nicData.pickedUp ? "Yes" : "No"}
              </span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2 ">
            <h1 className="text-2xl underline decoration-themeBgDark">
              Charged Cost:{" "}
              <span className="text-themeBg font-bold">
                PKR {nicData.price}
              </span>
            </h1>
          </div>
          <div className="w-4/5 flex items-center my-2 h-10 px-2 ">
            <h1 className="text-2xl underline decoration-themeBgDark">
              Final Cost:{" "}
              <span className="text-themeBg font-bold">
                PKR {nicData.finalPrice}
              </span>
            </h1>
          </div>
          <button
            className="w-1/4 flex justify-center items-center my-2 h-10 bg-themeBgDark rounded-xl px-2"
            onClick={() => handleIssue()}
          >
            ISSUE
          </button>
        </div>
      </div>
      <AuthBanner
        action={9}
        text="Dispatch the share to the Person"
        title="Issue Share"
      />
    </div>
  );
}

export default IssueShare;
