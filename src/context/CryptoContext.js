import { createContext, useLayoutEffect, useState } from "react";

//Create context object
export const CryptoContext = createContext({});

//Create the provider component
export const CryptoProvider = ({ children }) => {
  const [CryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [sortby, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(250);
  const [perPage, setParPage] = useState(20);

  const getCryptoData = async () => {
    // setTotalPage(13220)
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => res.json())
        .then((json) => json);
      //  console.log(data);
      setTotalPage(data.length);
    } catch (error) {
      console.log(error);
    }
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortby}&per_page=${perPage}&page=${page}&sparkline=false&locale=en&precision=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinId) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);
      console.log(data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);
      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortby, page, setParPage]);

  return (
    <CryptoContext.Provider
      value={{
        CryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortby,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setParPage,
        perPage,
        getCoinData,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
