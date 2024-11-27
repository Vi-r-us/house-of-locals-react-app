/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { IoIosLogOut } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";

const NavbarMenu = ({ isMenuOpen, setIsMenuOpen, handleLogout }) => {
  const user = useSelector((state) => state.userState.user);

  const menu = useRef();
  const navLinksRefs = useRef([]);
  const timelineMenu = useRef();

  // Define an array of navigation links
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Products", href: "/products" },
    { title: "Checkout", href: "/checkout" },
    { title: "Orders", href: "/orders" },
    { title: user ? "Logout" : "Login", href: `/${user ? `` : "login"}` },
  ];

  // Using the useGSAP hook to create a GSAP animation timeline for showing the menu
  useGSAP(
    () => {
      timelineMenu.current = gsap.timeline({ paused: true });

      timelineMenu.current.from(menu.current, {
        y: "-100%",
        duration: 0.5,
      });

      const navLinks = menu.current.querySelectorAll("a");

      if (navLinks) {
        timelineMenu.current.from(navLinks, {
          y: "100%",
          opacity: 0,
          duration: 0.2,
          stagger: 0.1,
        });
      }
    },
    { scope: [menu] }
  );

  // useEffect hook to play or reverse the animation based on isMenuOpen state
  useEffect(() => {
    if (isMenuOpen == undefined) return;
    if (isMenuOpen) timelineMenu.current.play();
    else timelineMenu.current.reverse();
  }, [isMenuOpen]);

  return (
    <div
      className="fixed inset-0 bg-tom-900 z-50 p-10 text-serenade-100"
      ref={menu}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex justify-between items-center md:text-2xl">
          <TfiClose
            className="w-6 h-6 cursor-pointer md:h-10 md:w-10"
            onClick={() => setIsMenuOpen(false)}
          />
          <h1 className="flex flex-col items-center">
            {user ? (
              <span>
                Hello, {user.username === "demo user" ? "Guest" : user.username}
              </span>
            ) : (
              ""
            )}{" "}
            Where to go?
          </h1>
        </div>

        <ul className="w-full h-full flex flex-col items-center justify-center gap-4">
          {navLinks.map((link, index) => {
            /* If user is not logged in, don't render Checkout and Orders */
            if (
              (link.title === "Checkout" || link.title === "Orders") &&
              !user
            ) {
              return null;
            }
            return (
              <li className="overflow-y-hidden" key={index}>
                {user && link.title === "Logout" ? (
                  <NavLink
                    className="text-5xl flex gap-2 items-center pb-2"
                    onClick={handleLogout}
                    to={link.href}
                  >
                    {link.title}
                    <IoIosLogOut />
                  </NavLink>
                ) : (
                  <NavLink
                    className={`text-5xl block ${
                      link.title === "Login" ? "pb-2" : ""
                    }`}
                    to={link.href}
                    ref={(e) => (navLinksRefs.current[index] = e)}
                  >
                    {link.title}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavbarMenu;
