/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { articlesList, heroImageUrl } from "../utils/Utilities";
import { useSelector } from "react-redux";

const Hero = () => {
  const [isActive, setIsActive] = useState(0);
  const windowWidth = useSelector((state) => state.windowState.width);
  const sliderRef = useRef(null);

  const handleNextActive = () => {
    if (windowWidth >= 768) {
      if (isActive === articlesList.length - 1) setIsActive(0);
      else setIsActive(isActive + 1);
      return;
    }
    const sliderElement = sliderRef.current;
    const totalSlides = articlesList.length;

    if (!sliderElement) return; // Return early if sliderElement is null or undefined

    if (isActive === totalSlides) {
      // Reset to the first slide without animation for a seamless loop
      sliderElement.style.transition = "none";
      setIsActive(0);
      sliderElement.style.transform = `translateX(0)`;
      setTimeout(() => {
        sliderElement.style.transition = "transform 0.7s ease-in-out";
        setIsActive(1);
        sliderElement.style.transform = `translateX(-100%)`;
      }, 0);
    } else {
      // Normal sliding
      setIsActive(isActive + 1);
      const widthOfCurrentArticle =
        sliderElement.children[isActive].offsetWidth;
      sliderElement.style.transform = `translateX(-${
        (isActive + 1) * widthOfCurrentArticle
      }px)`;
    }
  };

  return (
    <section
      className={`w-full h-[calc(100vh-1rem)] lg:h-[calc(100vh-2rem)] bg-tom-500 rounded-2xl bg-[url('${heroImageUrl}')] mt-[-16px]
      bg-cover bg-center bg-no-repeat text-serenade-50 flex items-end p-8 relative overflow-hidden`}
      style={{
        backgroundImage: `url(${heroImageUrl}`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_farthest-side,transparent,rgba(0,0,0,0.825))] z-0"></div>

      {/* Rendering the list of articles */}
      <div className="overflow-hidden z-10 w-full">
        <ul
          className="flex items-end z-10 transition-transform duration-700 ease-in-out"
          ref={sliderRef}
          style={{
            width: `${
              windowWidth < 768 ? (articlesList.length + 1) * 100 : 100
            }%`, // +1 for the duplicate slide
          }}
        >
          {articlesList.map((article, idx) => (
            <Article
              key={idx}
              articleTitle={article.articleTitle}
              articleLink={article.articleLink}
              buttonText={article.buttonText}
              isActive={isActive === idx}
              handleNextActive={handleNextActive}
            />
          ))}

          {/* Rendering the same list of articles twice to create an infinite scroll effect */}
          {windowWidth < 768 && (
            <Article
              articleTitle={articlesList[0].articleTitle}
              articleLink={articlesList[0].articleLink}
              buttonText={articlesList[0].buttonText}
              isActive={isActive === articlesList.length}
              handleNextActive={handleNextActive}
            />
          )}
        </ul>
      </div>
    </section>
  );
};

const text = "transform translate-x-[-100%] transition-all duration-1000";

const Article = ({
  articleTitle,
  articleLink,
  buttonText,
  isActive,
  handleNextActive,
}) => {
  const [time, setTime] = useState(Date.now());
  const windowWidth = useSelector((state) => state.windowState.width);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 4000);
    return () => {
      handleNextActive();
      clearInterval(interval);
    };
  }, [time, setTime, handleNextActive]);

  return (
    <li
      className={`${
        windowWidth >= 768
          ? "min-w-[calc(100%)] md:min-w-[calc(100%/3)]"
          : "min-w-[calc(100%/4)]"
      } duration-150 flex flex-col items-start justify-center gap-6 ${
        isActive ? "" : "opacity-30"
      }`}
    >
      <h1 className="text-3xl pr-4 md:pr-6 md:text-4xl">{articleTitle}</h1>
      <a
        href={articleLink}
        className={`flex items-center gap-3 text-base md:text-xl hover:gap-4 duration-150
        ${isActive ? "" : "cursor-default pointer-events-none"}`}
      >
        {buttonText} <HiOutlineArrowLongRight className="w-6 h-6" />
      </a>
      <div className="w-full h-[2px] md:h-[3px] bg-[rgba(255,245,235,0.3)] rounded-lg">
        <div
          className={`w-0 h-[2px] z-10 md:h-[3px] bg-serenade-50 rounded-lg
          ${isActive ? "animate-width-expand-animation" : ""}`}
        ></div>
      </div>
    </li>
  );
};

export default Hero;
