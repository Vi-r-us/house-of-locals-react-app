/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

/**
 * PaginationContainer component handles the rendering of pagination controls
 * based on the current page and total page count obtained from loader data.
 * It provides buttons for navigating between pages and handles page change events.
 * Uses `useLoaderData` to fetch pagination metadata, `useLocation` to get the URL,
 * and `useNavigate` to change the page query in the URL.
 * 
 * @returns {JSX.Element | null} A section containing pagination buttons or null if 
 * pagination is not necessary.
 */
const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > pageCount) pageNumber = pageCount;
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  
  /**
   * Returns a button element for a pagination page number.
   * @param {{ pageNumber: number, activeClass: boolean }} props
   * @returns {JSX.Element}
   */
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`text-sm text-tom-950 rounded-2xl border-[1px] border-tom-500 
          w-8 h-8 hover:bg-tom-400 duration-150 ${
            activeClass ? "bg-tom-200 font-bold" : ""
          }`}
      >
        {pageNumber}
      </button>
    );
  };

  /**
   * Renders page buttons from 1 to pageCount.
   * @returns {JSX.Element[]}
   */
  const renderPageButtons = () => {
    const pageButtons = [];
    // First Button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // Dots Button
    if (page > 2) {
      pageButtons.push(
        <button
          key={"dots-1"}
          className={`text-sm text-tom-950 rounded-2xl border-[1px] border-tom-500 
            w-8 h-8 hover:bg-tom-400 duration-150`}
        >
          ...
        </button>
      );
    }

    // Active / Current Page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // Dots Button
    if (page < pageCount - 1) {
      pageButtons.push(
        <button
          key={"dots-2"}
          className={`text-sm text-tom-950 rounded-2xl border-[1px] border-tom-500 
            w-8 h-8 hover:bg-tom-400 duration-150`}
        >
          ...
        </button>
      );
    }

    // Last Button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <section
      className="bg-serenade-50 border-[1px] border-tom-500 rounded-2xl 
      overflow-hidden product-grid p-2 flex justify-center items-center gap-2"
    >
      <button
        className="text-xl text-tom-500"
        onClick={() => handlePageChange(page - 1)}
      >
        <IoIosArrowBack />
      </button>

      {renderPageButtons()}

      <button
        className="text-xl text-tom-500"
        onClick={() => handlePageChange(page + 1)}
      >
        <IoIosArrowForward />
      </button>
    </section>
  );
};

export default PaginationContainer;
