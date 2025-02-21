import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchJobSeekerApplications } from "../store/slices/applicationSlice";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.user);
  const { applications } = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  // Fetch job seeker applications if the user is not an employer.
  useEffect(() => {
    if (user && user.role !== "Employer") {
      dispatch(fetchJobSeekerApplications());
    }
  }, [user, dispatch]);

  // Fetch jobs on load and whenever city or niche changes.
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, ""));
  }, [dispatch, error, city, niche]);

  // Trigger search using the current search keyword.
  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const cities = [
    "All",
    "Mumbai",
    "Thane",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ludhiana",
    "Agra",
    "Nashik",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="px-[100px] py-[40px] min-h-[800px] max-[920px]:px-[20px]">
          {/* Search Input */}
          <div className="relative flex justify-center w-[750px] mx-auto mb-[30px] max-[920px]:w-full">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full text-[20px] rounded-[7px] py-[12px] pr-[140px] pl-[8px] border border-gray-500 max-[550px]:pr-[55px]"
              placeholder="Search for jobs..."
            />
            <button
              onClick={handleSearch}
              className="absolute right-[16px] top-[11px] bg-[#dfdf07] text-[#111] font-medium px-[10px] py-[2px] rounded-[7px] border-0 max-[550px]:hidden"
            >
              Find Job
            </button>
            <FaSearch className="hidden absolute right-[16px] top-[18px] text-[#111] max-[550px]:block" />
          </div>

          <div className="flex gap-[50px]">
            {/* Sidebar Filters */}
            <div className="w-1/4 flex flex-col gap-[50px] max-[730px]:hidden">
              <div className="flex flex-col gap-[7px]">
                <h2 className="text-[24px] font-medium pb-[20px] border-b border-gray-500 mb-[20px]">
                  Filter Job By City
                </h2>
                {cities.map((city, index) => (
                  <div key={index} className="flex items-center gap-[12px]">
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[7px]">
                <h2 className="text-[24px] font-medium pb-[20px] border-b border-gray-500 mb-[20px]">
                  Filter Job By Niche
                </h2>
                {nichesArray.map((niche, index) => (
                  <div key={index} className="flex items-center gap-[12px]">
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Job Listings */}
            <div className="w-3/4 max-[730px]:w-full">
              {/* Mobile Filter Dropdowns */}
              <div className="hidden max-[730px]:flex max-[730px]:flex-wrap max-[730px]:gap-[15px]">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="max-[730px]:py-[4px] max-[730px]:px-[8px] max-[550px]:w-full"
                >
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="max-[730px]:py-[4px] max-[730px]:px-[8px] max-[550px]:w-full"
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-[40px] py-[50px] w-full max-[730px]:flex max-[730px]:flex-col max-[730px]:p-[20px] max-[730px]:border-t max-[730px]:border-gray-500 max-[730px]:mt-[20px]">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => {
                    // Adjusted matching logic:
                    // Try _id, id, or jobId from the application object.
                    const hasApplied =
                      user &&
                      user.role !== "Employer" &&
                      applications &&
                      applications.some((app) => {
                        const jobIdFromApplication =
                          (app.jobInfo && app.jobInfo._id) ||
                          (app.jobInfo && app.jobInfo.id) ||
                          (app.jobInfo && app.jobInfo.jobId);
                        console.log(
                          "Job ID:",
                          element._id,
                          "Application Job ID:",
                          jobIdFromApplication,
                          "Match:",
                          jobIdFromApplication === element._id
                        );
                        return jobIdFromApplication === element._id;
                      });

                    return (
                      <div
                        key={element._id}
                        className="relative transition duration-300 bg-[#f5f5f5] px-[40px] py-[20px] flex flex-col gap-[5px] rounded-[6px] hover:bg-[rgba(133,133,124,0.19)]"
                      >
                        {/* Render the applied icon if hasApplied is true */}
                        {hasApplied && (
                          <FaCheckCircle
                            className="absolute top-2 right-2 text-green-500 text-2xl z-10"
                            title="Already Applied"
                          />
                        )}
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="text-[16px] text-[#008b00] bg-[#008b0033] px-[4px] py-[3px] rounded-[5px] inline-block">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="text-[16px] text-[rgb(0,145,255)] bg-[rgba(0,145,255,0.338)] px-[4px] py-[3px] rounded-[5px] inline-block">
                            Hiring
                          </p>
                        )}
                        <p className="text-[#111] text-[24px] font-semibold">
                          {element.title}
                        </p>
                        <p className="text-[16px] text-gray-500">
                          {element.companyName}
                        </p>
                        <p className="text-[16px] text-gray-500">
                          {element.location}
                        </p>
                        <p className="text-[16px] text-gray-500">
                          <span className="font-semibold text-[#111] text-[16px]">
                            Salary:
                          </span>{" "}
                          Rs. {element.salary}
                        </p>
                        <p className="text-[16px] text-gray-500">
                          <span className="font-semibold text-[#111] text-[16px]">
                            Posted On:
                          </span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <div className="flex justify-end gap-[18px]">
                          <Link
                            className="text-[#111] font-medium transition duration-300 min-w-[170px] max-w-fit no-underline px-[30px] py-2.5 rounded-md bg-[#dfdf07]"
                            to={`/post/application/${element._id}`}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <img
                    src="./notfound.png"
                    alt="job-not-found"
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
