/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import NavbarMenu from "./NavbarMenu";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";
gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line react/prop-types
const Navbar = ({ isHome, navbarHeight, setNavbarHeight }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  // Define state variable isMenuOpen and a function setIsMenuOpen to control menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Using the useGSAP hook to create a GSAP animation timeline
  const navbarRef = useRef(null);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    setIsMenuOpen(false);
    queryClient.removeQueries();
  };

  useGSAP(
    () => {
      gsap.to(navbarRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: navbarRef.current,
          start: "2px",
          toggleActions: "play none none reverse",
          // markers: true,
        },
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        border: "1px solid #3f5a31",
        color: `${isHome ? "" : "#3f5a31"}`,
      });
    },
    { scope: [navbarRef] }
  );

  useEffect(() => {
    if (setNavbarHeight) setNavbarHeight(navbarRef.current.clientHeight);
  });

  // Rendering the navigation bar component
  // Three types of navbar,
  // one for the main page, one for the product page and rest for other pages
  return (
    <header>
      {/* The navbar */}
      <nav
        className={`h-12 rounded-xl fixed top-2 left-2 right-2 lg:left-4 lg:right-4 lg:top-4
        text-tom-50 flex justify-between items-center z-50 py-12 px-6 navbar 
        border-[1px] border-solid border-[rgba(255,255,255,0)] ${
          isHome === true ? "" : "bg-tom-700"
        } max-w-[120rem] mx-auto`}
        ref={navbarRef}
      >
        <div className="flex items-center gap-6">
          <IoMenuOutline
            tabIndex={0}
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
          <h2 className="text-xl font-acumin font-medium uppercase hidden md:block">
            Shop
          </h2>
        </div>

        <NavLink to={"/"}>
          <h1 className="text-5xl font-medium hidden md:block">
            House of Locals
          </h1>
          <h1 className="text-4xl font-medium md:hidden">H</h1>
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink to={"/products"} className="hidden md:block">
            <FiSearch className="w-6 h-6" />
          </NavLink>
          <NavLink
            to={`/${user ? "" : "login"}`}
            className="text-xl font-medium uppercase hidden md:block"
            onClick={user ? handleLogout : () => {}}
          >
            {user ? "Log out" : "Log in"}
          </NavLink>
          <NavLink
            to={"/cart"}
            className="text-xl font-medium uppercase flex gap-2"
          >
            <p>Cart</p>
            <p className="text-sm mt-[-6px]">[{numItemsInCart}]</p>
          </NavLink>
        </div>
      </nav>

      {/* The navbar menu */}
      <NavbarMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
