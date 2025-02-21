import React from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 max-w-screen-xl mx-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#111]">
        Find Your Dream Job Today
      </h1>

      <h4 className="text-3xl font-medium text-gray-500 sm:text-2xl md:text-3xl mt-4 max-w-2xl">
        Connecting Talent with Opportunities Across the Nation for Every Skill
        Level
      </h4>

      <div className="mt-10 max-w-3xl text-lg bg-[#dfdf07] text-[#111] px-8 py-6 sm:px-12 sm:py-8 md:px-16 md:py-10 rounded-3xl font-medium tracking-wide transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:bg-[#111] hover:text-white shadow-lg">
        Explore a vast array of job listings in diverse industries. Whether
        you're a seasoned professional or just starting out, find the perfect
        role to advance your career. Our platform makes job searching easy and
        efficient, bringing you closer to your next big opportunity.
      </div>
    </section>
  );
};

export default Hero;
