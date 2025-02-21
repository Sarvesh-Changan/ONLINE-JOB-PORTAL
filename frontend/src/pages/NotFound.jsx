import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      className="px-[100px] py-[40px] min-h-[800px] mx-auto 
                 max-[920px]:px-[20px] max-[920px]:min-h-[400px]"
    >
      <div
        className="flex flex-col justify-center items-center gap-[50px] 
                   min-h-[780px] max-[920px]:min-h-[400px]"
      >
        <h1 className="font-medium text-[5rem] max-[950px]:text-[3.5rem] max-[560px]:text-[2.5rem] max-[410px]:text-[1.5rem]">
          404 Not Found
        </h1>
        <p className="text-[18px] text-[#111] max-[560px]:text-center">
          Your Visited Page Not Found. You may go home page.
        </p>
        <Link to="/" className="no-underline text-center block w-fit py-3 px-3 font-bold text-white bg-blue rounded-md hover:bg-purple-700 transition">
          Back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
