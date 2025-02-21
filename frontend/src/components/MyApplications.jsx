import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-lg font-semibold text-gray-700">
          You have not applied for any job.
        </h1>
      ) : (
        <div className="flex flex-col gap-8 w-full min-h-[400px] p-6">
          {/* Header */}
          <h3 className="text-3xl font-semibold text-yellow-500 mt-4 transition-all duration-300 ease-in-out hover:scale-105">
            My Applications For Jobs
          </h3>
          {/* Applications Container */}
          <div className="flex flex-col gap-8">
            {applications.map((element) => (
              <div
                key={element._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="mb-2">
                    <span className="font-bold text-xl text-gray-900">
                      Job Title:
                    </span>{" "}
                    {element.jobInfo.jobTitle}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      element.status === "In-progress"
                        ? "bg-blue-100 text-blue-800"
                        : element.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : element.status === "Selected"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {element.status}
                  </span>
                </div>
                <p className="mb-2">
                  <span className="font-bold text-xl text-gray-900">
                    Name:
                  </span>{" "}
                  {element.jobSeekerInfo.name}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-xl text-gray-900">
                    Email:
                  </span>{" "}
                  {element.jobSeekerInfo.email}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-xl text-gray-900">
                    Phone:
                  </span>{" "}
                  {element.jobSeekerInfo.phone}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-xl text-gray-900">
                    Address:
                  </span>{" "}
                  {element.jobSeekerInfo.address}
                </p>
                <div className="mb-4">
                  <span className="font-bold text-xl text-gray-900 block mb-1">
                    Coverletter:
                  </span>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50"
                  ></textarea>
                </div>
                {/* Buttons */}
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => handleDeleteApplication(element._id)}
                    className="border border-red-500 text-white bg-red-700 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    Delete Application
                  </button>
                  <Link
                    to={element.jobSeekerInfo && element.jobSeekerInfo.resume.url}
                    target="_blank"
                    className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
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

export default MyApplications;