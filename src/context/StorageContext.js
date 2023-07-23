import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import {CryptoContext } from './CryptoContext'
 

 
 //Create context object
 export const StorageContext = createContext({});

 //Create the provider component
 export const StorageProvider = ({children}) => {
    const [allCoins, setAllCoins] = useState([]);
    const [savedData, setSaveData] = useState();

    let {currency, sortby} = useContext(CryptoContext)
   
  const saveCoin = (coinId) => {
     let oldCoins = JSON.parse(localStorage.getItem("coins"));

     if(oldCoins.includes(coinId)){
        return null;
     }else{
        let newCoin = [...oldCoins, coinId];
        setAllCoins(newCoin);
        localStorage.setItem("coins", JSON.stringify(newCoin));
     }
  }

  const removeCoin = (coinId) => {
    let oldCoin = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoin.filter(coin => coin !== coinId);
    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  }

  const getSavedData = async (totalCoins = allCoins) => {
   try{
     
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(",")}&order=${sortby}&sparkline=false&locale=en&precision=1h%2C24h%2C7d`).then(res => res.json()).then(json => json);
    console.log(data);
    setSaveData(data);


   }catch(error){
       console.log(error);
   }
};

const resetSavedResult = () => {  
   getSavedData();
}

useEffect(() => {
   if(allCoins.length > 0){
      getSavedData(allCoins);
   }else{
      setSaveData();
   }
}, [allCoins])

    useLayoutEffect(() => {
        let isThere = JSON.parse(localStorage.getItem("coins")) || false;

        if(!isThere){
            localStorage.setItem("coins", JSON.stringify([]));

//  set thr localstorage with empty array
        }else{
// set the state with the current from the local storage
       let totalCoins = JSON.parse(localStorage.getItem("coins"));
       setAllCoins(totalCoins);

       if(totalCoins.length > 0) {
         getSavedData(totalCoins);
       }
        }
        
    }, [ ])

     
    return(
        <StorageContext.Provider value={{saveCoin, allCoins, removeCoin , savedData, resetSavedResult }}>
        {children}
        </StorageContext.Provider>
    )
 }