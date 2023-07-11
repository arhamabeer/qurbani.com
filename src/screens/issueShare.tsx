import React from "react";
import AuthBanner from "../components/authBanner";

function IssueShare() {
  return (
    <div className="flex  justify-between">
      <div className="flex w-2/4 flex-col justify-center items-center">
        <div className="w-2/4 flex justify-center items-center my-2 h-10 border border-themeBgDark rounded-xl pl-2">
          <input
            type="text"
            className="h-full w-full bg-transparent text-themeBg placeholder-themeBgPlaceholder"
            placeholder="Enter Share ID..."
          />
          <button className="w-1/4 flex justify-center items-center my-2 h-10  bg-themeBgDark  rounded-r-xl  px-2">
            Find
          </button>
        </div>

        <div className="w-2/4 flex items-center my-2 h-10 px-2">
          <h1 className="text-2xl">
            Address: <span className="text-themeBg font-bold">Karachi</span>
          </h1>
        </div>
        <div className="w-2/4 flex items-center my-2 h-10 px-2">
          <h1 className="text-2xl">
            Number: <span className="text-themeBg font-bold">031515151515</span>
          </h1>
        </div>
        <div className="w-2/4 flex items-center my-2 h-10 px-2">
          <h1 className="text-2xl">
            Animal: <span className="text-themeBg font-bold">Cow</span>
          </h1>
        </div>
        <div className="w-2/4 flex items-center my-2 h-10 px-2">
          <h1 className="text-2xl">
            Animal Number: <span className="text-themeBg font-bold">12</span>
          </h1>
        </div>
        <div className="w-2/4 flex items-center my-2 h-10 px-2">
          <h1 className="text-2xl">
            Day: <span className="text-themeBg font-bold">1</span>
          </h1>
        </div>
        <div className="w-2/4 flex items-center my-2 h-10 px-2 ">
          <h1 className="text-2xl underline decoration-themeBgDark">
            Total Cost:{" "}
            <span className="text-themeBg font-bold">PKR 20000</span>
          </h1>
        </div>
        <button
          disabled
          className="w-1/4 flex justify-center items-center my-2 h-10 bg-themeBgDark rounded-xl px-2"
        >
          ISSUE
        </button>
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
