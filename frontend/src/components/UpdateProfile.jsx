import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAllUpdateProfileErrors, updateProfile } from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(user?.niches?.secondNiche || "");
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

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

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user?.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  // Filter niche options for unique selection
  const firstNicheOptions = nichesArray;
  const secondNicheOptions = nichesArray.filter(
    (niche) => niche !== firstNiche
  );
  const thirdNicheOptions = nichesArray.filter(
    (niche) => niche !== firstNiche && niche !== secondNiche
  );

  return (
    <div className="flex flex-col gap-8 w-full min-h-[400px] p-8 bg-white rounded-lg shadow-md">
      {/* Heading */}
      <h3 className="text-3xl font-semibold text-[#dfdf07] transition-transform duration-300">
        Update Profile
      </h3>

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Phone Number</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>

      {/* Job Seeker Specific Fields */}
      {user?.role === "Job Seeker" && (
        <>
          {/* Preferred Job Niches */}
          <div className="flex flex-col gap-4">
            <label className="text-lg font-medium text-gray-700">
              My Preferred Job Niches
            </label>
            <div className="flex flex-col gap-4">
              <select
                value={firstNiche}
                onChange={(e) => setFirstNiche(e.target.value)}
                className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="">Select First Niche</option>
                {firstNicheOptions.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              <select
                value={secondNiche}
                onChange={(e) => setSecondNiche(e.target.value)}
                className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="">Select Second Niche</option>
                {secondNicheOptions.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              <select
                value={thirdNiche}
                onChange={(e) => setThirdNiche(e.target.value)}
                className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="">Select Third Niche</option>
                {thirdNicheOptions.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">Coverletter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
              className="bg-gray-200 p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Upload Resume */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium text-gray-700">Upload Resume</label>
            <input
              type="file"
              onChange={resumeHandler}
              className="file:py-2 file:px-3 file:border file:border-gray-300 file:rounded file:bg-blue file:text-white focus:outline-none transition"
            />
            {user?.resume && (
              <div className="flex flex-col gap-2">
                <p className="text-gray-700">Current Resume:</p>
                <Link
                  to={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 w-fit text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="px-6 py-3 bg-blue text-white rounded-md shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
