/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoInstagram } from "react-icons/io5";

const footerLinks = [
  {
    title: "Order & Support",
    links: ["Shipping & Returns", "FAQ", "Contact Us"],
  },
  {
    title: "About",
    links: ["Our Story", "Sustainability", "Responsibility"],
  },
  {
    title: "Discover",
    links: ["Our Blog", "Best Sellers", "Custom Products"],
  },
];

const Footer = () => {
  return (
    <footer
      className="w-full bg-serenade-50 text-serenade-50 font-light overflow-hidden footer
      mb-[-8px] md:mb-[-16px] rounded-t-3xl grid gap-[1px] grid-cols-1 mt-auto"
    >
      <article className="bg-tom-700 p-6 md:p-10 flex flex-col gap-4 md:gap-6">
        <h1 className="text-xl md:text-5xl">
          Stay in the know by signing up to our newsletter !
        </h1>
        <input
          type="email"
          placeholder="E-Mail Address"
          className="w-full sm:max-w-[50%] p-2 px-4 bg-tom-700 border-[1px] border-serenade-50 rounded-lg
            focus:outline-none text-tom-50 placeholder:text-serenade-50 placeholder:text-sm placeholder:font-light"
        />
        <p className="text-sm mt-auto">
          You can unsubscribe anytime, check our privacy policy for more
          details.
        </p>
      </article>

      <article  
        className="flex flex-col justify-between gap-6 md:flex-col 
        text-sm bg-tom-700 p-6 md:gap-32 md:p-10"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row text-sm bg-tom-700">
          {footerLinks.map((ele, index) => (
            <FooterLinks ele={ele} key={index} />
          ))}
        </div>
        <div className="flex justify-between md:justify-start md:gap-10">
          <a
            className="flex items-center gap-1"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram className="w-5 h-5" /> @houseoflocals
          </a>
          <a
            className="flex items-center gap-1"
            href="https://www.gmail.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HiOutlineMail className="w-5 h-5" /> contact@hol.com
          </a>
        </div>
      </article>

      <article className="flex gap-2 text-sm bg-tom-700 p-6 md:col-span-2 md:p-10">
        <p>© House of Locals 2024.</p>
        <a className="ml-auto" href="#">
          Terms
        </a>
        <a href="#">Privacy</a>
      </article>
    </footer>
  );
};

const FooterLinks = ({ ele }) => {
  return (
    <div className="flex flex-col gap-1 text-sm text-serenade-50 text-center md:text-left">
      <p className="font-bold mb-1">{ele.title}</p>
      {ele.links.map((link, index) => (
        <p key={index}>{link}</p>
      ))}
    </div>
  );
};

export default Footer;
