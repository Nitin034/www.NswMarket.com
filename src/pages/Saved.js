import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { StorageContext } from "../context/StorageContext";
import { CryptoContext } from "../context/CryptoContext";
import { Link } from "react-router-dom";

const SaveBtn = ({data}) => {
  const { saveCoin, allCoins, removeCoin } = useContext(StorageContext);

  const handleClick = (e) => {
    e.preventDefault();
    saveCoin(data.id);

    if (allCoins.includes(data.id)) {
      removeCoin(data.id);
    } else {
      saveCoin(data.id);
    }
  };

  return (
    <button
      className="outline-0 border-0 bg-none cursor-pointer"
      onClick={(e) => handleClick(e)}
    >
      <svg
        className={`w-[2rem] ml-1.5 xs:w-[1.5rem]
                ${allCoins.includes(data.id) ? "fill-cyan" : "fill-gray-100 "}
                 hover:fill-cyan`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g>
          {" "}
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
        </g>
      </svg>
    </button>
  );
};
const Saved = () => {
  const { savedData, resetSavedResult } = useContext(StorageContext);
  let { currency } = useContext(CryptoContext);

  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 border border-gray-100 rounded">
        {savedData && (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-1">Asset</th>
                <th className="py-1">Name</th>
                <th className="py-1">Price</th>
                <th className="py-1 xs:hidden">Total Volume</th>
                <th className="py-1 xs:hidden md:hidden">Market cap change</th>
                <th className="py-1 xs:hidden md:hidden">Price Change</th>
                <th className="py-1 xs:hidden md:hidden">24H</th>
                <th className="py-1 xs:hidden">High 24h</th>
                <th className="py-1 xs:hidden md:hidden">Low 24h</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data) => {
                return (
                  <tr
                    key={data.id}
                    className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0 xs:text-sm"
                  >
                    <td className="py-4 flex items-center uppercase">
                      <SaveBtn data={data} />
                      <img
                        className="w-[2rem] h-[2rem] mx-2"
                        src={data.image}
                        alt={data.name}
                      />
                      <span>
                        <Link to={`/${data.id}`} className="cursor-pointer">
                          {data.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4 ">
                      <Link to={`/${data.id}`} className="cursor-pointer">
                        {data.id}
                      </Link>
                    </td>
                    <td className="py-4 ">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(data.current_price)}
                    </td>
                    <td className="py-4 xs:hidden">
                      {Number(data.total_volume).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.market_cap_change_percentage_24h > 0
                          ? "text-green py-4 xs:hidden md:hidden"
                          : "text-red py-4 xs:hidden md:hidden"
                      }
                    >
                      {data.market_cap_change_percentage_24h}%
                    </td>
                    <td
                      className={
                        data.price_change_24h > 0
                          ? "text-green py-4 xs:hidden md:hidden"
                          : "text-red py-4 xs:hidden md:hidden"
                      }
                    >
                      {Number(data.price_change_24h).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.price_change_percentage_24h > 0
                          ? "text-green py-4 xs:hidden md:hidden"
                          : "text-red py-4 xs:hidden md:hidden"
                      }
                    >
                      {data.price_change_percentage_24h}
                    </td>
                    <td
                      className={
                        data.high_24h > 0 ? "text-green py-4 xs:hidden " : "text-red py-4 xs:hidden"
                      }
                    >
                      {Number(data.high_24h).toFixed(2)}
                    </td>
                    <td
                      className={
                        data.low_24h > 0 ? "text-green py-4 xs:hidden md:hidden" : "text-red py-4 xs:hidden md:hidden"
                      }
                    >
                      {Number(data.low_24h).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <button
          onClick={resetSavedResult}
          className="w-[2rem] ml-4   hover:scale-110 transition-all transition-ease absolute right-0 -top-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
            viewBox="0 0 24 24"
            className="w-full h-full fill-cyan"
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </button>
      </div>
      <Outlet />
    </section>
  );
};

export default Saved;
