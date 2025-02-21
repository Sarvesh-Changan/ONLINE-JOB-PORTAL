import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="flex flex-col bg-[#dfdf07] justify-center items-center gap-12 px-6 py-16 md:px-12 lg:px-24">
      <h3 className="text-3xl font-bold text-[#111] uppercase text-center">
        How does it work?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <LuUserPlus className="text-5xl text-white" />,
            title: "Create an Account",
            description:
              "Sign up for a free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for jobs.",
          },
          {
            icon: <VscTasklist className="text-5xl text-white" />,
            title: "Post or Browse Jobs",
            description:
              "Employers can post detailed job descriptions, and job seekers can browse a comprehensive list of available positions.",
          },
          {
            icon: <BiSolidLike className="text-5xl text-white" />,
            title: "Hire or Get Hired",
            description:
              "Employers can shortlist candidates and extend job offers. Job seekers can review job offers and accept positions.",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-lg rounded-xl p-8 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:bg-[#111] hover:text-white"
          >
            <div className="w-16 h-16 flex justify-center items-center mx-auto bg-[#111] rounded-full mb-4 transition-colors duration-300 ease-in-out">
              {step.icon}
            </div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-700 hover:text-gray-300 transition-colors duration-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
