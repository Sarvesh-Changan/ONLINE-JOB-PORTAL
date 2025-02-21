import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import LOGO from "../public/images/jobLogo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <nav
        className={`flex items-center justify-between border-b border-gray-400 
          px-[110px] py-5 transition-all duration-300 ease-in-out
          md:px-10 max-[920px]:px-5 
          ${show ? "h-[200px]" : "h-auto"} 
          max-[600px]:${show ? "h-[380px]" : "h-auto"} 
          max-[470px]:${show ? "h-[340px]" : "h-[75px]"}`}
      >
        {/* Logo Section */}
        <div
          className="logo flex items-center gap-8
          md:gap-4 max-[470px]:gap-2
          md:flex-none"
        >
          <Link to="/" onClick={() => setShow(false)}>
            <img
              src={LOGO}
              alt="logo"
              className="w-[120px] md:w-[100px] lg:w-[140px] max-[470px]:w-[60px] transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>

        {/* Links Section */}
        <div
          className={`links flex ${show ? "flex-col gap-5 pt-5" : "items-center"} 
          transition-all duration-300 ease-in-out 
          md:flex md:flex-row md:gap-12`}
        >
          <ul
            className={`flex ${show ? "flex-col items-center gap-5" : "flex-row gap-12"} 
            items-center transition-all duration-300 ease-in-out`}
          >
            <li className="list-none">
              <Link
                to={"/"}
                onClick={() => setShow(false)}
                className="text-gray-700 hover:text-[#dfdf07] transition-colors duration-300"
              >
                HOME
              </Link>
            </li>
            <li className="list-none">
              <Link
                to={"/jobs"}
                onClick={() => setShow(false)}
                className="text-gray-700 hover:text-[#dfdf07] transition-colors duration-300"
              >
                JOBS
              </Link>
            </li>
            {(isAuthenticated && user?.role === "Job Seeker") && (
              <li className="list-none">
                <a
                  href="https://ai-resume-builder-h44c87whk-sarveshs-projects-50718d97.vercel.app/"
                  target="_blank"
                  onClick={() => setShow(false)}
                  className="text-gray-700 hover:text-[#dfdf07] transition-colors duration-300"
                >
                  AI RESUME BUILDER
                </a>
              </li>
            )}
            {isAuthenticated ? (
              <li className="list-none">
                <Link
                  to={"/dashboard"}
                  onClick={() => setShow(false)}
                  className="text-gray-700 hover:text-[#dfdf07] transition-colors duration-300"
                >
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li className="list-none">
                <Link
                  to={"/login"}
                  onClick={() => setShow(false)}
                  className="text-gray-700 hover:text-[#dfdf07] transition-colors duration-300"
                >
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>

        <GiHamburgerMenu
          onClick={() => setShow(!show)}
          className="hidden max-[1140px]:block text-[24px] cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      </nav>
    </>
  );
};

export default Navbar;