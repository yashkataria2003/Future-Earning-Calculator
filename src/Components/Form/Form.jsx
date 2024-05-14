import React, { useState } from 'react'
import PieChartResult from '../PieChartResult/PieChartResult';

const Form = () => {
    const [loanPercent, setLoanPercent] = useState("");
    const [currentSalary, setCurrentSalary] = useState("");
    const [targetBranch, setTargetBranch] = useState("");
    const [targetCountry, setTargetCountry] = useState("");
    const [rankingRange, setRankingRange] = useState("");
    const [currency, setCurrency] = useState("");


    const [totalExpenses, setTotalExpenses] = useState(0);
    const [futureEarnings, setFutureEarnings] = useState(0);


    const [results, setResults] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert currentSalary to number
        const salary = parseFloat(currentSalary);

        // Calculate future earnings
        const yearsToPayLoan = 5;

        const salaryIncrementOther_year = 0.025;  // 2.5% in other countries per year
        const salaryIncrementOther_alternate_year = 0.1;  // 10% in other countries alternate year
        const salaryIncrementIndia_year = 0.07;  // 7% in india per year
        const salaryIncrementIndia_alternate_year = 0.2;  // 20% in india alternate year

        const expenseIncrementOther = 0.02; // 2% expense increment in other countries
        const expenseIncrementIndia = 0.05; // 5% expense increment in India

        // Salary Increment in India
        let futureEarning_India = 0;
        for (let i = 1; i <= yearsToPayLoan; i++) {
            futureEarning_India += salary + (salary * salaryIncrementIndia_year)
        }
        for (let i = 1; i <= yearsToPayLoan; i += 2) {
            futureEarning_India += salary + (salary * salaryIncrementIndia_alternate_year)
        }

        let futureEarning_Other = 0;
        if (targetCountry === "UnitedStates" || targetCountry === "Australia" || targetCountry === "Canada" || targetCountry === "Germany") {
            // Salary Increment in Other Countries
            for (let i = 1; i <= yearsToPayLoan; i++) {
                futureEarning_Other += salary + (salary * salaryIncrementOther_year)
            }
            for (let i = 1; i <= yearsToPayLoan; i += 2) {
                futureEarning_Other += salary + (salary * salaryIncrementOther_alternate_year)
            }
        }
        if (currency === "USD") {
            setFutureEarnings(futureEarning_Other * 0.12)
        }

        else if(currency === "AUD") {
            setFutureEarnings(futureEarning_Other * 0.018)
        }

        else if(currency === "CAD") {
            setFutureEarnings(futureEarning_Other * 0.016)
        }

        else if(currency === "EUR") {
            setFutureEarnings(futureEarning_Other * 0.11)
        }

        else if(currency === "INR") {
            setFutureEarnings(futureEarning_Other)
        }

        // Expenses in India
        const totalExpenses_India = salary * (loanPercent / 100);

        // Expense increment in India
        let futureExpense_India = 0;
        for (let i = 1; i <= yearsToPayLoan; i++) {
            futureExpense_India += totalExpenses_India + (totalExpenses_India * expenseIncrementIndia)
        }

        // Expenses in Other Countries
        const totalExpenses_Other = futureEarning_Other * (loanPercent / 100);

        let futureExpense_Other = 0;
        if (targetCountry === "UnitedStates" || targetCountry === "Australia" || targetCountry === "Canada" || targetCountry === "Germany") {
            // Expense increment in INdia
            for (let i = 1; i <= yearsToPayLoan; i++) {
                futureExpense_Other += totalExpenses_Other + (totalExpenses_Other * expenseIncrementOther)
            }
        }
        if (currency === "USD") {
            setTotalExpenses(totalExpenses_Other * 0.12)
        }

        else if(currency === "AUD") {
            setTotalExpenses(totalExpenses_Other * 0.018)
        }

        else if(currency === "CAD") {
            setTotalExpenses(totalExpenses_Other * 0.016)
        }

        else if(currency === "EUR") {
            setTotalExpenses(totalExpenses_Other * 0.11)
        }

        else if(currency === "INR") {
            setTotalExpenses(totalExpenses_Other)
        }

        setResults(`Total Expenses: ${totalExpenses.toFixed(2)} ${currency}, Future Earnings: ${futureEarnings.toFixed(2)} ${currency}`)
    }


    return (
        <div className='flex justify-between items-center w-[100%] h-[100%] gap-x-[2vw] absolute'>
            <div className='flex flex-col justify-start items-start w-[60%] h-[100%] bg-[#00000052] px-[2vw] py-[2vh] gap-y-[2vh] rounded-3xl'>
                <h2 className='font-bold text-[3rem] text-white'>Future Earning Calculator</h2>
                <form action="post" onSubmit={handleSubmit} className='flex flex-col justify-start items-start gap-y-[2vh]'>
                    <ul className='flex flex-col justify-start  items-start gap-y-[1vh]'>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="loanPercent" className='font-bold text-[1.2rem]  text-white'>Loan Amount Percent : </label>
                                <input
                                    type="range"
                                    id="loanPercent"
                                    min="0"
                                    max="100"
                                    value={loanPercent}
                                    onChange={(e) => setLoanPercent(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            {
                                loanPercent ? (
                                    <span className='text-white'>{loanPercent}%</span>
                                ) : (
                                    <span className='text-[#fffcfc8b]'>Loan Amount Percent is required</span>
                                )
                            }
                        </li>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="currentSalary" className='font-bold text-[1.2rem]  text-white'>Current Salary : </label>
                                <input
                                    type="range"
                                    id="currentSalary"
                                    min="100000"
                                    max="4000000"
                                    value={currentSalary}
                                    onChange={(e) => setCurrentSalary(e.target.value)}
                                    required
                                />
                            </div>
                            {
                                currentSalary ? (
                                    <span className='text-white'>{currentSalary}</span>
                                ) : (
                                    <span className='text-[#fffcfc8b]'>Current Annual Salary is required</span>
                                )
                            }
                        </li>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="targetBranch" className='font-bold text-[1.2rem]  text-white'>Target Branch : </label>
                                <select
                                    id="targetBranch"
                                    value={targetBranch}
                                    onChange={(e) => setTargetBranch(e.target.value)}
                                    required
                                    className='flex justify-center items-center rounded-lg py-[0.8vh] px-[0.5vw]'
                                >
                                    <option disabled >Select</option>
                                    <option value="AerospaceEngineering">Aerospace Engineering</option>
                                    <option value="Biotechnology">Biotechnology</option>
                                    <option value="ChemicalEngineering">Chemical Engineering</option>
                                    <option value="CivilEngineering">Civil Engineering</option>
                                    <option value="ComputerScienceEngineering">Computer Science Engineering</option>
                                    <option value="ElectricalandElectronicsEngineering">Electrical and Electronics Engineering</option>
                                    <option value="EngineeringManagement">Engineering Management</option>
                                    <option value="Finance">Finance</option>
                                    <option value="IndustrialEngineering">Industrial Engineering</option>
                                    <option value="InformationTechnology">Information Technology</option>
                                    <option value="MaterialScience">Material Science</option>
                                    <option value="MechanicalEngineering ">Mechanical Engineering</option>
                                    <option value="MIS">MIS</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            {
                                !targetBranch && <span className='text-[#fffcfc8b]'>Target Branch is required</span>
                            }
                        </li>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="targetCountry" className='font-bold text-[1.2rem]  text-white'>Target Country : </label>
                                <select
                                    id="targetCountry"
                                    value={targetCountry}
                                    onChange={(e) => setTargetCountry(e.target.value)}
                                    required
                                    className='flex justify-center items-center rounded-lg py-[0.8vh] px-[0.5vw]'
                                >
                                    <option disabled >Select</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Germany">Germany</option>
                                    <option value="UnitedStates">United States</option>
                                </select>
                            </div>
                            {
                                !targetCountry && <span className='text-[#fffcfc8b]'>Target Country is required</span>
                            }
                        </li>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="rankingRange" className='font-bold text-[1.2rem]  text-white'>College Ranking Range : </label>
                                <select
                                    id="rankingRange"
                                    value={rankingRange}
                                    onChange={(e) => setRankingRange(e.target.value)}
                                    required
                                    className='flex justify-center items-center rounded-lg py-[0.8vh] px-[0.5vw]'
                                >
                                    <option disabled >Select</option>
                                    <option value="1-50">1-50</option>
                                    <option value="51-100">51-100</option>
                                    <option value="101-250">101-250</option>
                                    <option value="251-500">251-500</option>
                                    <option value="500+">500+</option>
                                </select>
                            </div>
                            {
                                !rankingRange && <span className='text-[#fffcfc8b]'>College Ranking Range is required</span>
                            }
                        </li>
                        <li className='flex flex-col justify-start items-start border-[0.1rem] border-white rounded-2xl px-[1vw] py-[1vh]'>
                            <div className='flex justify-center items-center gap-x-[0.5vw]'>
                                <label htmlFor="currency" className='font-bold text-[1.2rem]  text-white'>Currency : </label>
                                <select
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    required
                                    className='flex justify-center items-center rounded-lg py-[0.8vh] px-[0.5vw]'
                                >
                                    <option disabled >Select</option>
                                    <option value="INR">INR (India)</option>
                                    <option value="USD">USD (United States)</option>
                                    <option value="AUD">AUD (Australia)</option>
                                    <option value="CAD">CAD (Canada)</option>
                                    <option value="EUR">EUR (Germany)</option>
                                </select>
                            </div>
                            {
                                !currency && <span className='text-[#fffcfc8b]'>Currency is required</span>
                            }
                        </li>
                    </ul>
                    <button type="submit" value="submit" className='px-[1vw] py-[1vh] bg-white border-[#fff7] rounded-xl border-[0.1rem] hover:border-white hover:bg-[#ffffff28] hover:text-white'>Calculate</button>
                </form>
            </div>
            <PieChartResult totalExpenses={totalExpenses} futureEarnings={futureEarnings} targetBranch={targetBranch} targetCountry={targetCountry} rankingRange={rankingRange} currency={currency} loanPercent={loanPercent} results={results} />
        </div>
    )
}

export default Form
