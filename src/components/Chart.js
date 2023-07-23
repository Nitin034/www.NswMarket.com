import React, { useContext, useLayoutEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';
import { CryptoContext } from '../context/CryptoContext';



function CustomTooltip({ payload, label, active,currency = "inr" }){
    if(active && payload && payload.length>0){
        return(
            <div className='custom-tooltip'> 
            <p className='label text-sm text-cyan'>{`${label} : ${
                new Intl.NumberFormat("en-IN",{
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 5,
                  }).format(payload[0].value)
                  }`}</p> 
            <p className='text-[8px] text-cyan'>Welcome to Nsw Cripto </p>
            </div>
        )
    }
}


function ChartComponent({data, currency, type}) {

    return (
        <ResponsiveContainer height={"90%"}> 
        <LineChart width={400} height={400} data={data}>
  <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1px"} />
  <XAxis dataKey="date" hide />
  <YAxis dataKey={type} hide domain={["auto", "auto"]}/>
  <CartesianGrid stroke="#323232" strokeDasharray="3 3" />
  <Tooltip content={<CustomTooltip/>} currency={currency} cursor={false} wrapperStyle={{outline: "none"}}/>
  <Legend/>
</LineChart>
</ResponsiveContainer>)
     
}


const Chart = ({id}) => {
    const [chartData, setChartData] = useState(); 
    let {currency} = useContext(CryptoContext);
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);

    useLayoutEffect(() => {
        const getChartData = async (id) => {

        try{
          
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}&interval=daily&precision=10`)

            .then((res) => res.json())
            .then((json) => json);

            console.log("chart-data",data);

            let convertedData = data[type].map(item => {
                return{
                    date: new Date(item[0]).toLocaleDateString(),
                    [type]: item[1],
                }
            }
                )

              console.log(convertedData); 

            setChartData(convertedData);
    
    
           }catch(error){
               console.log(error);
    }
        
}

  getChartData(id)
    }, [id , type, days])
  return (
    <div className='w-full h-[60%]'>
      <ChartComponent data={chartData} currency={currency} type={type}/>
      <div className='flex'>
        <button className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs xs:ml-0   ${type === "prices" ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100 '}`} onClick={() => setType("prices")}>Price</button>
        <button  className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs ${type === "market_caps" ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100 '}`} onClick={() => setType("market_caps")}>Market Cap</button>
        <button  className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs ${type === "total_volumes" ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100 '}`} onClick={() => setType("total_volumes")}>Total Volume</button>
        <button  className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs ${days === 7 ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100 '}`} onClick={() => setDays(7)}>7D</button>
        <button  className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs ${days === 14 ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100 '}`} onClick={() => setDays(14)}>14D</button>
        <button  className={`text-sm  font-medium py-0.5 px-1.5 ml-2 bg-opacity-50 xs:text-xs ${days === 30 ? 'bg-cyan text-dark' : 'bg-gray-200 text-gray-100  '}`} onClick={() => setDays(30)}>1Month</button>
        
      </div>
    </div>
  )
}

export default Chart
