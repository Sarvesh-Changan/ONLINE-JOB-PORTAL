import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  if (loading) return <Spinner />;

  if (!myJobs || myJobs.length <= 0)
    return (
      <h1 className="text-[1.4rem] font-semibold text-center mt-8">
        You have not posted any job!
      </h1>
    );

  return (
    <div className="flex flex-col gap-[30px] w-full min-h-[400px] p-8">
      {/* Heading */}
      <h3 className="text-[30px] font-semibold text-[#dfdf07] transition-transform duration-300">
        My Jobs
      </h3>

      {/* Jobs List */}
      <div className="flex flex-col gap-[30px]">
        {myJobs.map((job) => (
          <div
            key={job._id}
            className="bg-[#8080803d] mb-8 py-[25px] px-[12px] rounded-[7px] transition-colors duration-300 hover:bg-[rgba(133,133,124,0.19)]"
          >
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Job Title:
              </span>
              {job.title}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Job Niche:
              </span>
              {job.jobNiche}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Salary:
              </span>
              {job.salary}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Location:
              </span>
              {job.location}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Job Type:
              </span>
              {job.jobType}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Company Name:
              </span>
              {job.companyName}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Introduction:
              </span>
              {job.introduction}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Qualifications:
              </span>
              {job.qualifications}
            </p>
            <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
              <span className="font-semibold text-[20px] text-[#111]">
                Responsibilities:
              </span>
              {job.responsibilities}
            </p>
            {job.offers && (
              <p className="flex flex-col gap-[5px] text-[16px] text-gray-500">
                <span className="font-semibold text-[20px] text-[#111]">
                  What Are We Offering:
                </span>
                {job.offers}
              </p>
            )}
            <div className="flex gap-5 justify-end mt-4">
              <button
                onClick={() => handleDeleteJob(job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-red-700 transform hover:scale-105"
              >
                Delete Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
