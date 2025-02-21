import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import LOGO from "../public/images/jobLogo.png";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  // State for social media links (unused in this snippet but kept for consistency)
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  return (
    <>
      <footer className="bg-[#111] border-b border-[rgb(133,133,133)] px-[110px] py-[40px] max-[1112px]:px-[40px] max-[1112px]:py-[40px] max-[606px]:px-5 max-[606px]:py-5">
        <div className="flex flex-col md:flex-row">
          {/* Logo Column */}
          <div className="flex flex-1 pr-5 justify-center items-center max-[1112px]:w-1/2 max-[1112px]:mb-8 max-[606px]:w-full max-[606px]:p-0">
            <Link to="/">
              <img
                src={LOGO}
                alt="logo"
                className="w-[140px] md:w-[120px] lg:w-[160px] max-[470px]:w-[80px] transition-all duration-300 cursor-pointer"
              />
            </Link>
          </div>

          {/* Sections Container */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row justify-around text-gray-300 space-y-8 md:space-y-0">
              {/* Support Section */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h4 className="font-bold tracking-wide text-xl md:text-[26px] mb-4">
                  Support
                </h4>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    8th Floor, Omega Tower, Hitech City, Hyderabad, India
                  </li>
                  <li>contact@jobmatrix.com</li>
                  <li>+91 98765 43210</li>
                </ul>
              </div>

              {/* Quick Links Section */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h4 className="font-bold tracking-wide text-xl md:text-[26px] mb-4">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <Link
                      to="/"
                      className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                    >
                      JOBS
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Follow Us Section */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h4 className="font-bold tracking-wide text-xl md:text-[26px] mb-4">
                  Follow Us
                </h4>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      href="https://www.instagram.com/changansarvesh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                    >
                      <FaSquareInstagram />
                      <span>Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/Sarvesh-Changan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                    >
                      <SiGithub />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/sarvesh-changan-600842311/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center md:justify-start gap-2 transition-colors duration-300 hover:text-[#dfdf07] no-underline"
                    >
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#111] flex justify-center text-center text-[#8080805c] font-light p-5">
        &copy; Copyright 2024. All Rights Reserved By Sarvesh
      </div>
    </>
  );
};

export default Footer;
