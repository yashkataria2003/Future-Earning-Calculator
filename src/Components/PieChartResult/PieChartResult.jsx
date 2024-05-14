import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieChartResult = ({ totalExpenses, futureEarnings, targetBranch, targetCountry, rankingRange, currency, loanPercent, results }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Update the data whenever totalExpenses or futureEarnings changes
        setData([
            { name: "Total Expenses", value: parseFloat(totalExpenses) },
            { name: "Future Earnings", value: parseFloat(futureEarnings) },
        ]);
    }, [totalExpenses, futureEarnings]);

    const COLORS = ["#0088FE", "#00C49F"];

    return (
        <div className='flex flex-col justify-start items-center w-[40%] h-[100%] rounded-2xl px-[2vw] py-[2vh] gap-y-[2vh] bg-[#00000052]'>
            <div className='flex flex-col justify-center items-center  gap-y-[2vh] px-[1vw] py-[1vh]'>
                <p className='bg-white px-[1vw] py-[1vh] rounded-lg font-bold'>TotalExpenses : <span className='text-[1rem] font-normal'>{totalExpenses} {currency}</span></p>
                <p className='bg-white px-[1vw] py-[1vh] rounded-lg font-bold'>FutureEarnings : <span className='text-[1rem] font-normal'>{futureEarnings} {currency}</span></p>
            </div>
            <div className='flex flex-col justify-start items-start bg-white h-fit rounded-2xl px-[2vw] py-[2vh] w-full'>
                <p className='font-bold'>Target Branch : <span className='text-[1rem] font-normal'>{targetBranch}</span></p>
                <p className='font-bold'>Target Country : <span className='text-[1rem] font-normal'>{targetCountry}</span></p>
                <p className='font-bold'>Ranking Range : <span className='text-[1rem] font-normal'>{rankingRange}</span></p>
                <p className='font-bold'>Currency : <span className='text-[1rem] font-normal'>{currency}</span></p>
                <p className='font-bold'>Loan Percent : <span className='text-[1rem] font-normal'>{loanPercent}%</span></p>
            </div>
            <PieChart width={400} height={400} className='flex justify-center items-center'>
                <Pie
                    data={data}
                    cx={150}
                    cy={150}
                    labelLine={false}
                    outerRadius={150}
                    fill="#bb7d6c"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default PieChartResult
