import React, { useContext } from 'react'
import { CryptoContext } from '../context/CryptoContext'
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
 
import { StorageContext } from '../context/StorageContext';

const SaveBtn = ({data}) => {

  const {saveCoin, allCoins, removeCoin} = useContext(StorageContext);

const handleClick = (e) => {
  e.preventDefault();
  saveCoin(data.id)
   
  if(allCoins.includes(data.id)){
    removeCoin (data.id)
  }else{
    saveCoin(data.id);
  }
}

  return(
    <button className='outline-0 border-0 bg-none cursor-pointer' onClick={(e) => handleClick(e)}>
                <svg 
                className= {`w-[2rem] ml-1.5 xs:w-[1.5rem]
                ${allCoins.includes(data.id)?"fill-cyan" : "fill-gray-100 " }
                 hover:fill-cyan`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                  > 
                <g> <path 
                fill="none" 
                d="M0 0h24v24H0z"/> 
                <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/> 
                </g> 
                </svg>
                </button>
  )
}

const TableComponent = () => {

let {CryptoData, currency} = useContext(CryptoContext);

  return (
    <> 
    <div className='flex flex-col mt-9 border border-gray-100 rounded'>
    {
      CryptoData ? 
      <table className='w-full table-auto'>
        <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100'>
            <tr>
                <th className='py-1 xs:text-sm'>Asset</th>
                <th className='py-1 xs:text-sm'>Name</th>
                <th className='py-1 xs:text-sm'>Price</th>
                <th className='py-1 xs:hidden'>Total Volume</th>
                <th className='py-1 xs:hidden md:hidden'>Market cap change</th>
                <th className='py-1 xs:hidden md:hidden'>Price Change</th>
                <th className='py-1 xs:hidden md:hidden'>24H</th>
                <th className='py-1 xs:hidden'>High 24h</th>
                <th className='py-1 xs:hidden md:hidden'>Low 24h</th>
            </tr>
        </thead>
        <tbody>
       {
        CryptoData.map(data => {
          return(
            <tr key={data.id} className='text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0 xs:text-sm md:text-md'>
                <td className='py-4 flex items-center uppercase'>
                 <SaveBtn data={data}/>
                <img className='w-[2rem] h-[2rem] mx-2 xs:w-[1.5rem] xs:h-[1.5rem]' src={data.image} alt={data.name}  />
                <span><Link to={`/${data.id}`} className='cursor-pointer'>{data.symbol}</Link></span>


                </td>
                <td className='py-4 '>
                <Link to={`/${data.id}`} className='cursor-pointer'>{data.id}</Link>
                </td>
                <td className='py-4 '>{ 
                  new Intl.NumberFormat("en-IN",{
                    style: "currency",
                    currency: currency
                  }).format(data.current_price)
                }</td>
                <td className='py-4 xs:hidden '>{Number(data.total_volume).toFixed(2)}</td>
                <td className={ 
                   data.market_cap_change_percentage_24h > 0 ? "text-green py-4 xs:hidden md:hidden" : "text-red py-4 xs:hidden md:hidden" 
                } >{data.market_cap_change_percentage_24h}%</td>
                <td className={
                   data.price_change_24h > 0 ? "text-green py-4 xs:hidden md:hidden" : "text-red py-4 xs:hidden md:hidden"
                }>{Number( data.price_change_24h
).toFixed(2)
}</td>
                <td className={
                  data.price_change_percentage_24h > 0 ? "text-green py-4 xs:hidden md:hidden" : "text-red py-4 xs:hidden md:hidden "
                }>{data.price_change_percentage_24h}</td>
                <td className={data.high_24h > 0 ? "text-green py-4 xs:hidden" : "text-red py-4 xs:hidden "
                }>{Number(data.high_24h).toFixed(2)}</td>
                <td className= {data.low_24h > 0 ? "text-green py-4 xs:hidden md:hidden" : "text-red py-4 xs:hidden md:hidden"
                }>{Number(data.low_24h).toFixed(2)}</td>
            </tr>
          )
        })
       }
        </tbody>
    </table>
       : 
       <div className='w-full h-full min-h-[60vh] flex items-center justify-center'>
                   <div className='w-8 h-8 bottom-4 border-2 border-cyan rounded-full border-b-gray-200 animate-spin' role='status'/>
                   <span className='ml-2'>Please Wait...</span>
                   </div>
    }
    </div>
    <div className='flex items-center justify-between mt-4 capitalize h-[2rem] xs:h-[6rem] xs:flex-col'>
    <span>Data Provided by <a className='text-cyan' href='http://www.coingecko.com' rel="noreferrer" target={"_blank"}>Coingecko</a></span>
      <Pagination/>
    </div> 
    </>
  )
}

export default TableComponent
