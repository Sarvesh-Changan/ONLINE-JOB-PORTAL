import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-8 w-full min-h-[400px] p-8 rounded-lg shadow-md">
      {/* Heading */}
      <h3 className="text-3xl font-semibold text-[#dfdf07] transition-transform duration-300">
        My Profile
      </h3>

      {/* Full Name */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          disabled
          value={user?.name || ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Email Address */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          disabled
          value={user?.email || ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Preferred Job Niches for Job Seekers */}
      {user?.role === "Job Seeker" && (
        <div className="flex flex-col gap-2 relative">
          <label className="text-lg font-medium text-gray-700">
            My Preferred Job Niches
          </label>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              disabled
              value={user?.niches?.firstNiche || ""}
              onChange={(e) => e.target.value}
              className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
            />
            <input
              type="text"
              disabled
              value={user?.niches?.secondNiche || ""}
              onChange={(e) => e.target.value}
              className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
            />
            <input
              type="text"
              disabled
              value={user?.niches?.thirdNiche || ""}
              onChange={(e) => e.target.value}
              className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Phone Number */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="number"
          disabled
          value={user?.phone || ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">Address</label>
        <input
          type="text"
          disabled
          value={user?.address || ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Role */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">Role</label>
        <input
          type="text"
          disabled
          value={user?.role || ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Joined On */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-lg font-medium text-gray-700">Joined On</label>
        <input
          type="text"
          disabled
          value={user?.createdAt ? user.createdAt.substring(0, 10) : ""}
          onChange={(e) => e.target.value}
          className="bg-[#8080805e] p-2 border-0 text-gray-600 rounded focus:outline-none transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default MyProfile;
