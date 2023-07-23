import React from 'react'
import { useNavigate } from 'react-router-dom'

const TrendingCoin = ({data}) => {

    let navigate = useNavigate();
    const getCoinDetails = (id) => {
         navigate(id);
    }

  return (
    <div className='w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40 xs:w-[85%] xs:mx-auto '
    onClick={() => getCoinDetails(data.id)}>
      {data ?
      <> 
        <h3 className='text-base flex items-center my-0.5'>
            <span className='text-gray-100 capitalize '>Name :&nbsp;</span>
            <span className='text-cyan'>{data.name}</span>
             <img src={data.small} alt={data.name}  className='w-[1.5] h-[1.5] mx-1.5 rounded-full xs:w-9 xs:h-9'/>
        </h3>
        <h3 className='text-base flex items-center my-0.5'>
            <span className='text-gray-100 capitalize '>symbol :&nbsp;</span>
            <span className='text-cyan'>{data.symbol
}</span>
            </h3>
        <h3 className='text-base flex items-center my-0.5'>
            <span className='text-gray-100 capitalize '>Market Cap Rank :&nbsp;</span>
            <span className='text-cyan'>{data.market_cap_rank}</span>
        </h3>
        <h3 className='text-base flex items-center my-0.5'>
            <span className='text-gray-100 capitalize '>Price (in btc) :&nbsp;</span>
            <span className='text-cyan'>
            {new Intl.NumberFormat("en-IN",{
                    style: "currency",
                    currency: "inr", maximumSignificantDigits : 5,
                  }).format(data.price_btc)}
             </span>
        </h3>
        <h3 className='text-base flex items-center my-0.5'>
            <span className='text-gray-100 capitalize '>Score (in btc) :&nbsp;</span>
            <span className='text-cyan'>
            {new Intl.NumberFormat("en-IN",{
                    style: "currency",
                    currency: "inr", maximumSignificantDigits : 5,
                  }).format(data.score)}
             </span>
        </h3>
        <img src={data.large} alt={data.name}  className='w-[35%] h-[auto] rounded-full absolute top-2/4 -right-12 -translate-y-2/4 xs:hidden md:hidden'/>
        </>
      : null
       }
    </div>
  )
}

export default TrendingCoin
