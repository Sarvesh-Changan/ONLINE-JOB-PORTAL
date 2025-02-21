import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAllUpdateProfileErrors, updatePassword } from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <form
      onSubmit={handleUpdatePassword}
      className="flex flex-col gap-8 w-full min-h-[400px] p-8 bg-gray-50 rounded-lg shadow-md"
    >
      <h3 className="text-3xl font-semibold text-[#dfdf07] transition-transform duration-300">
        Update Password
      </h3>
      
      {/* Current Password */}
      <div className="relative flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Current Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Enter current password"
          className="bg-gray-200 p-2 px-3 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
        {showPassword ? (
          <FaRegEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        ) : (
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        )}
      </div>

      {/* New Password */}
      <div className="relative flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="bg-gray-200 p-2 px-3 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
        {showPassword ? (
          <FaRegEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        ) : (
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative flex flex-col gap-2">
        <label className="text-lg font-medium text-gray-700">Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="bg-gray-200 p-2 px-3 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
        {showPassword ? (
          <FaRegEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        ) : (
          <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-2 right-3 text-2xl cursor-pointer transition-transform duration-200 hover:scale-110"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue text-white rounded-md shadow-md transition-transform duration-300 hover:scale-105 disabled:opacity-50"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
