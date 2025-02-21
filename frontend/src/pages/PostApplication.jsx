import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  // Get job and user details from Redux store
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { jobId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Initialize state for form fields using user data (if available)
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);

  // Local state for field validation errors
  const [errors, setErrors] = useState({});

  // Validate required fields before submission
  const validateForm = () => {
    const errorsObj = {};
    if (!name || name.trim() === "") errorsObj.name = "Name is required.";
    if (!email || email.trim() === "") errorsObj.email = "Email is required.";
    if (!phone || phone.toString().trim() === "")
      errorsObj.phone = "Phone number is required.";
    if (!address || address.trim() === "")
      errorsObj.address = "Address is required.";

    // For job seekers, require cover letter and resume
    if (user && user.role === "Job Seeker") {
      if (!coverLetter || coverLetter.trim() === "")
        errorsObj.coverLetter = "Cover Letter is required.";
      if (!resume) errorsObj.resume = "Resume not uploaded.";
    }
    return errorsObj;
  };

  // Handle form submission
  const handlePostApplication = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Stop submission if there are validation errors
    }
    // Clear any previous errors
    setErrors({});

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume instanceof File) {
      formData.append("resume", resume);
    } else if (typeof resume === "string") {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
    resetForm();
  };

  // Reset form fields and errors
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCoverLetter("");
    setResume("");
    setErrors({});
  };

  // Fetch user data, job details and handle errors/success messages
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      resetForm();
      // Redirect to '/jobs' after successful submission
      navigateTo("/jobs");
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user, navigateTo]);

  // Process job details (qualifications, responsibilities, and offers)
  let qualifications = singleJob.qualifications
    ? singleJob.qualifications.split(". ")
    : [];
  let responsibilities = singleJob.responsibilities
    ? singleJob.responsibilities.split(". ")
    : [];
  let offering = singleJob.offers ? singleJob.offers.split(". ") : [];

  // Handle resume file selection
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <>
      <article className="flex gap-[40px] max-w-[1500px] mx-auto px-4 py-8 max-[830px]:flex-col-reverse">
        {/* Application Form */}
        <form
          onSubmit={handlePostApplication}
          className="flex flex-col gap-[20px] flex-1 py-[50px] max-[830px]:pt-0"
        >
          <h3 className="text-[24px] font-medium mb-[20px]">Application Form</h3>

          {/* Job Title (disabled) */}
          <div className="flex flex-col gap-[7px]">
            <label className="text-[16px] font-medium">Job Title</label>
            <input
              type="text"
              placeholder={singleJob?.title}
              disabled
              className="py-[7px] px-[4px] border border-gray-300 rounded bg-gray-100"
            />
          </div>

          {/* Your Name */}
          <div className="flex flex-col gap-[7px]">
            <label className="text-[16px] font-medium">Your Name</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="py-[7px] px-[4px] border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          {/* Your Email */}
          <div className="flex flex-col gap-[7px]">
            <label className="text-[16px] font-medium">Your Email</label>
            <input
              type="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="py-[7px] px-[4px] border border-gray-300 rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-[7px]">
            <label className="text-[16px] font-medium">Phone Number</label>
            <input
              type="number"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              className="py-[7px] px-[4px] border border-gray-300 rounded"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-[7px]">
            <label className="text-[16px] font-medium">Address</label>
            <input
              type="text"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              className="py-[7px] px-[4px] border border-gray-300 rounded"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          {/* For Job Seekers: Cover Letter and Resume */}
          {user && user.role === "Job Seeker" && (
            <>
              <div className="flex flex-col gap-[7px]">
                <label className="text-[16px] font-medium">Cover Letter</label>
                <textarea
                  value={coverLetter || ""}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                  className="py-[7px] px-[4px] border border-gray-300 rounded"
                />
                {errors.coverLetter && (
                  <span className="text-red-500 text-sm">
                    {errors.coverLetter}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-[7px]">
                <label className="text-[16px] font-medium">Resume</label>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="file:py-[7px] file:px-[4px] file:border file:border-gray-300 file:rounded"
                />
                {errors.resume && (
                  <span className="text-red-500 text-sm">{errors.resume}</span>
                )}
              </div>
            </>
          )}

          {/* Apply Button for authenticated Job Seekers */}
          {isAuthenticated && user.role === "Job Seeker" && (
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#dfdf07] text-[#111] font-medium py-2 px-5 rounded-md transition duration-300 hover:shadow-lg"
              >
                Apply
              </button>
            </div>
          )}
        </form>

        {/* Job Details Section */}
        <div className="flex flex-col flex-1 py-[50px]">
          <header className="flex flex-col gap-[8px]">
            <h3 className="text-[24px] font-medium">{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link
                to={singleJob.personalWebsite.url}
                target="_blank"
                className="text-[16px] text-gray-500 hover:underline"
              >
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p className="text-[16px] text-gray-500">{singleJob.location}</p>
            <p className="text-[16px] text-gray-500">
              Rs. {singleJob.salary} a month
            </p>
          </header>

          <hr className="my-[20px]" />

          <section className="flex flex-col gap-[10px]">
            {/* Job Details: Pay and Job Type */}
            <div className="flex flex-col gap-[10px]">
              <h3 className="text-[24px] font-medium">Job details</h3>
              <div className="flex gap-[10px]">
                <IoMdCash className="text-[16px] text-gray-500" />
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[16px] text-gray-500">Pay</span>
                  <span className="text-[16px] text-gray-500">
                    {singleJob.salary} a month
                  </span>
                </div>
              </div>
              <div className="flex gap-[10px]">
                <FaToolbox className="text-[16px] text-gray-500" />
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[16px] text-gray-500">Job type</span>
                  <span className="text-[16px] text-gray-500">
                    {singleJob.jobType}
                  </span>
                </div>
              </div>
            </div>

            <hr className="my-[20px]" />

            {/* Location */}
            <div className="flex flex-col gap-[10px]">
              <h3 className="text-[24px] font-medium">Location</h3>
              <div className="flex items-center">
                <FaLocationDot className="text-[16px] text-gray-500" />
                <span className="text-[16px] text-gray-500 ml-2">
                  {singleJob.location}
                </span>
              </div>
            </div>

            <hr className="my-[20px]" />

            {/* Full Job Description */}
            <div className="flex flex-col gap-[10px]">
              <h3 className="text-[24px] font-medium">Full Job Description</h3>
              <p className="text-[16px] text-gray-500">{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h4 className="text-[22px] font-medium mb-[10px]">Qualifications</h4>
                  <ul className="list-inside">
                    {qualifications.map((element, idx) => (
                      <li key={idx} className="text-[16px] text-gray-500">
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4 className="text-[22px] font-medium mb-[10px]">Responsibilities</h4>
                  <ul className="list-inside">
                    {responsibilities.map((element, idx) => (
                      <li key={idx} className="text-[16px] text-gray-500">
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h4 className="text-[22px] font-medium mb-[10px]">Offering</h4>
                  <ul className="list-inside">
                    {offering.map((element, idx) => (
                      <li key={idx} className="text-[16px] text-gray-500">
                        {element}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <hr className="my-[20px]" />

          <footer className="flex flex-col bg-transparent p-0 border-0">
            <h3 className="text-[24px] font-medium">Job Niche</h3>
            <p className="text-[16px] text-gray-500">{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;