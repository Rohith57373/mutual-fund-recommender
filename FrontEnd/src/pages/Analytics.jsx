import { RecentsTransactions } from "@/components/RecentTransaction";
import BasicPie from "@/components/charts/BasicPie";
import BasicGauges from "@/components/charts/Glory";
import BasicLineChart from "@/components/charts/LineChart";
import { SecondBar } from "@/components/charts/SecondBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
// Assuming SecondBar is imported correctly
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate(); // Get the day of the month

  // Pad the day with leading zeros if it's a single digit
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  return formattedDay;
};
export const Analytics = () => {
  const [selectedCategory, setSelectedCategory] = useState("Friends");
  const [formattedData, setFormattedData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/level/transaction/getTransaction",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const transactions = response.data.transactions;

        const totalSpent = transactions.reduce(
          (acc, transaction) => acc + Math.abs(transaction.amount),
          0
        );
        console.log("Total Spent:", totalSpent);

        const formattedData = transactions.map((transaction) => ({
          category: transaction.category,
          amount: transaction.amount,
          date: formatDate(transaction.date),
        }));
        console.log("Formatted Transaction Data:", formattedData);

        setFormattedData(formattedData);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredTransactions = transactions
    .filter((transaction) => transaction.category === selectedCategory)
    .slice(0, 5);

  return (
    <div className="ml-[5rem] px-8 py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold ">Get Your Insights here.</h1>
      <div className="flex flex-row items-center gap-[50px]">
        <div className="mt-4 py-6 px-8 relative flex flex-col justify-center items-center h-[55vh] w-[55vw] border-2 border-border rounded-lg">
          <div className="absolute top-2 right-2">
            <Select onValueChange={handleCategoryChange} defaultValue="">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friend">Friends/Family</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SecondBar
            transactions={filteredTransactions}
            height={800}
            width={600}
          />
        </div>
        <div className="mt-4 py-6 px-8 relative flex flex-col justify-center items-center h-[45vh] w-[30vw] border-2 border-border rounded-lg">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <BasicPie transactions={transactions} height={300} width={500} />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="bg-[#D6DDFC] rounded-lg max-w-[35vw] py-4 px-4">
          <h1 className="text-xl font-semibold">Recent Transactions</h1>
          <div className="grid grid-cols-1 gap-3 overflow-y-auto p-2 max-h-[40vh] w-[30vw]">
            {transactions
              .slice()
              .reverse()
              .map((transaction, index) => (
                <RecentsTransactions
                  key={index}
                  to={transaction.to}
                  type={transaction.type}
                  amount={transaction.amount}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh] w-[15vw] border-2 border-border rounded-lg p-4">
          <h1 className="font-semibold text-md text-primary">
            Probability of Reaching Your Goal.
          </h1>
          <BasicGauges spent={70} valueMax={100} />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh] w-[35vw] border-2 border-border rounded-lg p-4">
          <h1 className="font-semibold text-md text-primary"></h1>
          <BasicLineChart spendingData={formattedData} />
        </div>
      </div>
    </div>
  );
};
