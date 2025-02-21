import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 
                   px-4 sm:px-6 lg:px-8 md:min-w-[1500px] md:max-w-[1500px] md:mx-auto 
                   max-[1520px]:min-w-full"
      >
        {/* Form Container */}
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Login to your account
            </h3>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Login As */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Login As
              </label>
              <div className="flex rounded-md shadow-sm">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 block w-full rounded-l-md border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Login as an Employer</option>
                  <option value="Job Seeker">Login as a Job Seeker</option>
                </select>
                <span className="inline-flex items-center px-3 rounded-r-md bg-blue-600 text-white">
                  <FaRegUser className="text-lg" />
                </span>
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex rounded-md shadow-sm">
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 block w-full rounded-l-md border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="inline-flex items-center px-3 rounded-r-md bg-blue-600 text-white">
                  <MdOutlineMailOutline className="text-lg" />
                </span>
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex rounded-md shadow-sm">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 block w-full rounded-l-md border-gray-300 bg-gray-100 focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="inline-flex items-center px-3 rounded-r-md bg-blue-600 text-white">
                  <RiLock2Fill className="text-lg" />
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-bold text-white bg-blue rounded-md hover:bg-purple-700 transition"
              >
                Login
              </button>
            </div>
            <div>
              <Link
                to={"/register"}
                className="w-full block text-center py-3 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
              >
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
