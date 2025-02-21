import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center text-center px-6 py-16 max-w-screen-xl mx-auto">
      {/* Title */}
      <h3 className="text-3xl font-bold text-[#dfdf07] uppercase">Top Niches</h3>

      {/* Grid Container */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {services.map((element) => (
          <div
            key={element.id}
            className="bg-[#111] text-white p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-[#dfdf07] hover:text-[#111] hover:-translate-y-2"
          >
            <h4 className="text-xl font-semibold uppercase">{element.service}</h4>
            <p className="mt-2 text-gray-300 hover:text-gray-800 transition-colors duration-300">
              {element.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;
