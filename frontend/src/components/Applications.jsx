import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
  updateApplicationStatus,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateApplicationStatus({ id, newStatus }));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "In-progress":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "On-hold":
        return "bg-yellow-100 text-yellow-800";
      case "Selected":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user || user.role !== "Employer") {
    return (
      <h1 className="text-center text-lg sm:text-xl font-medium mt-8 text-red-600">
        Access Denied. Only employers can view this page.
      </h1>
    );
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-center text-lg sm:text-xl font-medium mt-8">
          You have no applications from job seekers.
        </h1>
      ) : (
        <div className="flex flex-col gap-6 w-full min-h-[400px] p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-[30px] font-semibold text-[#dfdf07]">
            Applications For Your Posted Jobs
          </h3>
          <div className="flex flex-col gap-6">
            {applications.map((element) => (
              <div
                key={element._id}
                className="bg-[#f5f5f5] p-4 sm:p-6 text-[#111] font-medium rounded-lg transition duration-300 hover:bg-[rgba(133,133,124,0.19)]"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 mb-4">
                  <p className="text-sm sm:text-base text-gray-500">
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block sm:inline">
                      Job Title:
                    </span>{" "}
                    {element.jobInfo.jobTitle}
                  </p>
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 self-start">
                    <span className="text-sm sm:text-base text-[#111]">Status:</span>
                    <select
                      value={element.status || "In-progress"}
                      onChange={(e) => handleStatusChange(element._id, e.target.value)}
                      style={{ backgroundColor: 'white' }}
                      className={`px-2 sm:px-3 py-1 rounded text-sm font-medium border ${getStatusStyle(
                        element.status
                      )} focus:outline-none focus:ring-2 focus:ring-yellow-500 min-w-[120px]`}
                    >
                      <option value="In-progress">In Progress</option>
                      <option value="On-hold">On Hold</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Selected">Selected</option>
                    </select>
                  </div>
                </div>

                {/* Applicant Information */}
                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-gray-500">
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block sm:inline">
                      Applicant's Name:
                    </span>{" "}
                    {element.jobSeekerInfo.name}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block sm:inline">
                      Applicant's Email:
                    </span>{" "}
                    {element.jobSeekerInfo.email}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block sm:inline">
                      Applicant's Phone:
                    </span>{" "}
                    {element.jobSeekerInfo.phone}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block sm:inline">
                      Applicant's Address:
                    </span>{" "}
                    {element.jobSeekerInfo.address}
                  </p>
                </div>

                {/* Cover Letter */}
                <div className="mt-4">
                  <span className="font-semibold text-base sm:text-lg md:text-xl text-[#111] block">
                    Applicant's Cover Letter:
                  </span>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                    className="bg-transparent text-sm sm:text-base text-gray-500 mt-2 w-full resize-none p-2"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:justify-end mt-6">
                  {user && user.role === "Employer" && (
                    <button
                      onClick={() => handleDeleteApplication(element._id)}
                      className="border border-red-500 text-white bg-red-700 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out text-sm sm:text-base w-full sm:w-auto"
                    >
                      Delete Application
                    </button>
                  )}
                  <Link
                    to={element.jobSeekerInfo?.resume.url || "#"}
                    className="bg-[#dfdf08] text-[#111] font-medium py-2 px-5 rounded-md transition duration-300 hover:shadow-lg text-center text-sm sm:text-base w-full sm:w-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;