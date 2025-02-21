import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
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

  const cities = [
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

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    if (offers) formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    if (hiringMultipleCandidates)
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    if (personalWebsiteTitle)
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    if (personalWebsiteUrl)
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex flex-col gap-8 w-full min-h-[400px] p-8">
      {/* Heading */}
      <h3 className="text-3xl font-semibold text-[#dfdf07] transition-transform duration-300">
        Post A Job
      </h3>
      {/* Title */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Job Type */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Job Type</label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>
      {/* Location */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Location (City)</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {/* Company Name */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Company/Job Introduction */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Company/Job Introduction</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Company / Job Introduction"
          rows={7}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Responsibilities */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Responsibilities</label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder="Job Responsibilities"
          rows={7}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Qualifications */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Qualifications</label>
        <textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder="Required Qualifications For Job"
          rows={7}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Offers (Optional) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="text-lg font-medium">What We Offer</label>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CiCircleInfo className="text-xl" /> Optional
          </span>
        </div>
        <textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          placeholder="What are we offering in return!"
          rows={7}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Job Niche */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Job Niche</label>
        <select
          value={jobNiche}
          onChange={(e) => setJobNiche(e.target.value)}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        >
          <option value="">Select Job Niche</option>
          {nichesArray.map((element, idx) => (
            <option key={idx} value={element}>
              {element}
            </option>
          ))}
        </select>
      </div>
      {/* Salary */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Hiring Multiple Candidates (Optional) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="text-lg font-medium">Hiring Multiple Candidates?</label>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CiCircleInfo className="text-xl" /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {/* Personal Website Title (Optional) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="text-lg font-medium">Personal Website Name</label>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CiCircleInfo className="text-xl" /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Personal Website Name/Title"
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Personal Website URL (Optional) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="text-lg font-medium">Personal Website Link (URL)</label>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <CiCircleInfo className="text-xl" /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="Personal Website Link (URL)"
          className="bg-[#8080805e] p-2 border-none text-gray-700 rounded focus:outline-none transition-all duration-200"
        />
      </div>
      {/* Post Job Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePostJob}
          disabled={loading}
          className="bg-[#111] text-white px-8 py-3 rounded-lg transition-transform duration-300 hover:scale-105"
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default JobPost;