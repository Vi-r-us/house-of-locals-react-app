/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import image from "../assets/error-bg.png";
import { NavLink, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const UserAuth = ({ children }) => {
  const location = useLocation();
  // const alreadyUser = location.pathname === "/login" ? true : false;

  return (
    <main className="main p-6 justify-center">
      <section
        className="md:border-[1px] border-[#b5bcaf] rounded-[20px] grid grid-rows-1 
          gap-7 w-full md:grid-cols-2 h-full md:flex-1"
      >
        <figure
          className="rounded-[20px] relative max-w-[390px] md:max-w-full self-center md:self-auto overflow-hidden
            justify-self-center md:justify-self-auto md:col-start-2 md:row-start-1 md:row-end-2"
        >
          <img
            className="h-full w-full object-cover"
            src={image}
            alt="Content"
          />

          {/* Close Button */}
          <NavLink to="/">
            <RxCross2 className="w-8 h-8 md:w-10 md:h-10 text-serenade-50 absolute top-4 right-4" />
          </NavLink>
        </figure>

        {/* SignIn Component */}
        {children}
      </section>
    </main>
  );
};

export default UserAuth;
