import React, { useContext, useRef } from "react";
import PaginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const {setParPage} = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setParPage(val);
       
    }
  };
  return (
    <form
      className="relative flex items-center font-sans mr-12 xs:hidden"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="Per Page"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        Per Page:{" "}
      </label>
      <input
        type="number"
        name="PerPage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="20"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 "
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages/perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const Prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

//   if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center xs:justify-center">
        <PerPage />
        <ul className="flex items-center justify-end text-sm ">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-8" onClick={Prev}>
              <img
                className="w-full h-auto rotate-180"
                src={PaginationArrow}
                alt="left"
              />
            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button
                onClick={multiStepPrev}
                className="outline-0 hover:text-cyan rounded-full flex items-center justify-center text-lg "
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={Prev}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-100 mx-1.5"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="outline-0 text-dark rounded-full w-8 h-8 flex items-center justify-center bg-cyan   mx-1.5"
            >
              {page}
            </button>
          </li>
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-100 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}
          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={multiStepNext}
                className="outline-0 hover:text-cyan rounded-full flex items-center justify-center text-lg"
              >
                ...
              </button>
            </li>
          ) : null}
          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-100"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 hover:text-cyan w-8" onClick={next}>
              <img
                className="w-full h-auto"
                src={PaginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
//   } else {
//     return null;
//   }
};

export default Pagination;
