import React from "react";
import { Puff } from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full h-fit m-auto fixed top-0 bottom-0 flex justify-center items-center flex-col">
      <Puff
        width="100"
        radius={1}
        color="#3cb29c"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {/* <h1 className="text-themeBg  font-semibold">Loading...</h1> */}
    </div>
  );
}

export default Loader;
