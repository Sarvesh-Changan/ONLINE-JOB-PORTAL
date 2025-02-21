import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { MdOutlineMailOutline, MdCategory } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  // Common fields
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // Job Seeker–specific fields
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Ensure unique selection for niches.
  const filteredFirstNicheOptions = nichesArray.filter(
    (niche) => niche !== secondNiche && niche !== thirdNiche
  );
  const filteredSecondNicheOptions = nichesArray.filter(
    (niche) => niche !== firstNiche && niche !== thirdNiche
  );
  const filteredThirdNicheOptions = nichesArray.filter(
    (niche) => niche !== firstNiche && niche !== secondNiche
  );

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // Redirect to login if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const handleRegsiter = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);

    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
      setFormSubmitted(false);
    }
    if (message && formSubmitted) {
      toast.success("Registered successfullly");
      navigateTo("/login");
    }
  }, [dispatch, error, message, navigateTo, formSubmitted]);

  return (
    <>
      <section
        className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-50 
                   px-4 sm:px-6 lg:px-8 md:min-w-[1500px] md:max-w-[1500px] md:mx-auto 
                   max-[1520px]:min-w-full"
      >
        {/* Increased width form container */}
        <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Create a New Account
            </h3>
          </div>
          <form onSubmit={handleRegsiter} className="space-y-8">
            {/* First Row: Role & Name */}
            <div className="flex gap-8 max-[910px]:flex-col">
              {/* Register As */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Register As
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
              </div>
              {/* Name */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>
            {/* Second Row: Email & Phone */}
            <div className="flex gap-8 max-[910px]:flex-col">
              {/* Email Address */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  placeholder="1112223333"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>
            {/* Third Row: Address & Password */}
            <div className="flex gap-8 max-[910px]:flex-col">
              {/* Address */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-base font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>
            {/* Conditional fields for Job Seeker */}
            {role === "Job Seeker" && (
              <>
                {/* Divide extra fields into two parts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Part: Niche Selections */}
                  <div className="space-y-6">
                    {/* Your First Niche */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-gray-700">
                        Your First Niche
                      </label>
                      <select
                        value={firstNiche}
                        onChange={(e) => setFirstNiche(e.target.value)}
                        className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      >
                        <option value="">Your Niche</option>
                        {filteredFirstNicheOptions.map((niche, index) => (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Your Second Niche */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-gray-700">
                        Your Second Niche
                      </label>
                      <select
                        value={secondNiche}
                        onChange={(e) => setSecondNiche(e.target.value)}
                        className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      >
                        <option value="">Your Niche</option>
                        {filteredSecondNicheOptions.map((niche, index) => (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Your Third Niche */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-gray-700">
                        Your Third Niche
                      </label>
                      <select
                        value={thirdNiche}
                        onChange={(e) => setThirdNiche(e.target.value)}
                        className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      >
                        <option value="">Your Niche</option>
                        {filteredThirdNicheOptions.map((niche, index) => (
                          <option key={index} value={niche}>
                            {niche}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Right Part: Coverletter & Resume */}
                  <div className="space-y-6">
                    {/* Coverletter */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-gray-700">
                        Coverletter
                      </label>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={8}
                        placeholder="Your Coverletter"
                        className="bg-gray-100 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      ></textarea>
                    </div>
                    {/* Resume */}
                    <div className="flex flex-col gap-2">
                      <label className="text-base font-medium text-gray-700">
                        Resume
                      </label>
                      <input
                        type="file"
                        onChange={resumeHandler}
                        className="border rounded-md w-full focus:outline-none p-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={loading}
                className="py-3 text-center border-0 mt-6 px-10 font-bold text-white bg-indigo-600 text-xl rounded-lg transition hover:shadow-lg"
              >
                Register
              </button>
              <Link
                to={"/login"}
                className="py-3 text-center border px-10  border-indigo-600 mt-6 font-bold text-white text-xl rounded-lg no-underline transition bg-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
