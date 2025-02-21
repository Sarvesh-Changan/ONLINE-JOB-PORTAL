import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <section className="min-h-[525px] flex justify-center items-center">
      <ClipLoader size={150} />
    </section>
  );
};

export default Spinner;
