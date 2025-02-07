import { AddGoalUI } from "@/components/AddGoalUi";
import BasicBars from "@/components/charts/BarChart";
import BasicGauges from "@/components/charts/Glory";
import HorizontalGrid from "@/components/charts/HorizontalChart";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
function calculateAverage(valuesArray) {
  if (valuesArray.length === 0) return 0;
  const sum = valuesArray.reduce((acc, curr) => acc + parseFloat(curr), 0);
  return parseInt(sum / valuesArray.length);
}
const HomePage = () => {
  const navigate = useNavigate();
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [chartData, setChartData] = useState({
    categories: [],
    seriesData: [],
  });
  const toggleReadSection = () => {
    navigate("/read");
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:3002/level/transaction/getTransaction",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        const transactions = response.data.transactions;
        const totalSpent = transactions.reduce(
          (acc, transaction) => acc + Math.abs(transaction.amount),
          0
        );

        console.log("Total Spent:", totalSpent);

        // Set the total spent amount to the state
        setTotalSpent(totalSpent);
        const formattedData = transactions.map((transaction) => ({
          category: transaction.category,
          amount: transaction.amount,
          date: formatDate(transaction.date), // Format date to month and year
        }));
        setFormattedData(transactions);
        setTransactionData(formattedData);
        console.log("Transaction Data:", formattedData);

        // Function to shuffle array (Fisher-Yates shuffle)
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        // Handle the response data
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name (e.g., Jan, Feb, ...)
      const year = date.getFullYear(); // Get full year (e.g., 2023)
      return `${month} ${year}`;
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    const fetchuser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3002/level/user/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data.user;
        console.log("User Data:", userData);
        // Handle the response data
        setUserData(userData);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchuser();
  }, []);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3002/level/goal/getgoal",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoals(response.data.goal);
        console.log("Goals fetched successfully:", response.data.goal);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  const [max, setMax] = useState(0);
  useEffect(() => {
    const fetchdaily = async () => {
      try {
        const dailylimit = await axios.get(
          "http://localhost:3002/level/priority/calculateDailyLimit",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Assuming dailylimit.data is your object containing the amounts
        let maxlimit = 0; // Initialize max with a default value
        console.log(dailylimit.data.result.daily);
        // Iterate over the keys in dailylimit.data
        const valuesArray = [];

        for (const category in dailylimit.data.result.daily) {
          if (dailylimit.data.result.daily.hasOwnProperty(category)) {
            valuesArray.push(dailylimit.data.result.daily[category]);
          }
        }
        // function calculateAverage(valuesArray) {
        //   if (valuesArray.length === 0) return 0;
        //   const sum = valuesArray.reduce(
        //     (acc, curr) => acc + parseFloat(curr),
        //     0
        //   );
        //   return parseInt(sum / valuesArray.length);
        // }
        maxlimit = calculateAverage(valuesArray);

        setMax(maxlimit);
        const setCookie = async () => {
          Cookies.set("daily", max, {
            domain: ".localhost",
            expires: 7,
            sameSite: "None",
            secure: true,
          });
        };
        await setCookie();
        localStorage.setItem("dailylimit", maxlimit);
        console.log("daily limit", dailylimit.data.result.daily);
        console.log(valuesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdaily();
  }, [transactionData]);
  return (
    <div>
      <div className="relative ml-[5rem] py-6 px-8 flex flex-row gap-[75rem]">
        <div className="flex flex-col gap-1 justify-start items-start">
          <h1 className="text-3xl font-bold">Welcome, {userData.username}</h1>
          <p className="text-md font-light">LevelUp.Money dashboard.</p>
        </div>
        <div className=" flex flex-col items-start justify-center p-2 border-2 border-border h-[10vh] w-[12vw] rounded-lg">
          <h2 className="text-xl font-semibold">Daily Limit</h2>
          <p className="text-lg">Rs. {max}</p>
        </div>
      </div>
      <div className="ml-[5rem] py-8 px-8 flex flex-row justify-between gap-2">
        <div className="flex flex-col justify-center items-center h-[35vh] w-[15vw] border-2 border-border rounded-lg p-4">
          <div className="flex flex-col items-start place-self-start ">
            <h1 className="text-xl font-semibold">Total Spent</h1>
            <p>Recent Total</p>
          </div>
          <BasicGauges spent={totalSpent} valueMax={100000} />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh]  border-2 border-border rounded-lg w-[45vw]">
          <HorizontalGrid
            dataset={transactionData}
            dataKey={transactionData.category}
            datakeyY={transactionData.amount}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh]  border-2 border-border rounded-lg ">
          <BasicBars />
        </div>
      </div>
      <div className="ml-[5rem] px-8 flex flex-col justify-start gap-2">
        <h1 className="text-2xl font-semibold">Goals</h1>
        <div>
          <AddGoalUI goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
