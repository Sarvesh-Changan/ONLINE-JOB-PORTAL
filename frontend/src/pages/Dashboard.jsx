import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigateTo("/"); // Redirect to home page after logout
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error]);

  return (
    <section className="px-4 py-6 min-h-screen bg-white rounded-lg shadow-sm transition-all duration-300 sm:px-10 md:px-20 lg:px-[100px]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2">
        <p className="text-3xl font-extrabold bg-gradient-to-r from-blue via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Dashboard
        </p>
        <p className="font-medium text-[#1f1e1e] text-lg">
          Welcome!{" "}
          <span className="text-[#2863ac] font-bold">{user && user.name}</span>
        </p>
      </div>

      <div className="flex relative">
        {/* Sidebar */}
        <div
          className={`absolute transition duration-300 left-[-100%] md:relative md:left-0 min-w-[200px] flex flex-col gap-6 ${
            show && "left-0 bg-[#111] h-full w-[308px] p-5 z-20 sm:w-64"
          }`}
        >
          <h4 className="font-semibold tracking-wide text-[20px] mb-5 text-white md:text-[#111]">
            Manage Account
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <button
                onClick={() => {
                  setComponentName("My Profile");
                  setShow(false);
                }}
                className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                  componentName === "My Profile" && "text-[#dfdf07]"
                }`}
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setComponentName("Update Profile");
                  setShow(false);
                }}
                className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                  componentName === "Update Profile" && "text-[#dfdf07]"
                }`}
              >
                Update Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setComponentName("Update Password");
                  setShow(false);
                }}
                className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                  componentName === "Update Password" && "text-[#dfdf07]"
                }`}
              >
                Update Password
              </button>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Job Post");
                      setShow(false);
                    }}
                    className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                      componentName === "Job Post" && "text-[#dfdf07]"
                    }`}
                  >
                    Post New Job
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Jobs");
                      setShow(false);
                    }}
                    className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                      componentName === "My Jobs" && "text-[#dfdf07]"
                    }`}
                  >
                    My Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(false);
                    }}
                    className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                      componentName === "Applications" && "text-[#dfdf07]"
                    }`}
                  >
                    Applications
                  </button>
                </li>
              </>
            )}
            {user && user.role === "Job Seeker" && (
              <li>
                <button
                  onClick={() => {
                    setComponentName("My Applications");
                    setShow(false);
                  }}
                  className={`transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07] ${
                    componentName === "My Applications" && "text-[#dfdf07]"
                  }`}
                >
                  My Applications
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="transition duration-300 border-0 bg-transparent font-light text-gray-500 hover:text-[#dfdf07]"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Sidebar Toggle Icon */}
        <div
          className={`hidden max-[712px]:flex w-fit p-1 rounded-full relative bottom-[-18px] transition duration-300 ${
            show ? "bg-white left-0" : "bg-[#111]"
          }`}
        >
          <LuMoveRight
            onClick={() => setShow(!show)}
            className={`transition duration-300 ${
              show ? "rotate-180 text-[#111]" : "text-white"
            } text-[30px]`}
          />
        </div>
        {/* Main Component Display */}
        <div className="w-full max-w-[800px] mx-auto">
          {(() => {
            switch (componentName) {
              case "My Profile":
                return <MyProfile />;
              case "Update Profile":
                return <UpdateProfile />;
              case "Update Password":
                return <UpdatePassword />;
              case "Job Post":
                return <JobPost />;
              case "My Jobs":
                return <MyJobs />;
              case "Applications":
                return <Applications />;
              case "My Applications":
                return <MyApplications />;
              default:
                return <MyProfile />;
            }
          })()}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
