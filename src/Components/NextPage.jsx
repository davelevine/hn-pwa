import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { NextIcon, PreviousIcon } from "./Icons";

const NextPage = React.memo(({ currentPage, currentSort }) => {
  const handlePreviousPage = useCallback(() => {
    if (+currentPage > 1) {
      return `/${currentSort}/${+currentPage - 1}`;
    }
    return null;
  }, [currentPage, currentSort]);

  const handleNextPage = useCallback(() => {
    if (+currentPage < 10) {
      return `/${currentSort}/${+currentPage + 1}`;
    }
    return null;
  }, [currentPage, currentSort]);

  return (
    <div className="flex flex-row py-4 justify-evenly">
      {handlePreviousPage() && (
        <Link to={handlePreviousPage()}>
          <div className="flex flex-row items-center px-4 py-2 font-medium text-center rounded-md dark:hover:bg-white hover:bg-black hover:bg-opacity-10 focus-within:outline-none">
            <PreviousIcon size={20} />
            <div className="ml-2">Previous Page</div>
          </div>
        </Link>
      )}
      {handleNextPage() && (
        <Link to={handleNextPage()}>
          <div className="flex flex-row items-center px-4 py-2 font-bold text-center rounded-md dark:hover:bg-white hover:bg-black hover:bg-opacity-10 focus-within:outline-none">
            <div className="mr-2">Next Page</div>
            <NextIcon size={20} />
          </div>
        </Link>
      )}
    </div>
  );
});

export default NextPage;