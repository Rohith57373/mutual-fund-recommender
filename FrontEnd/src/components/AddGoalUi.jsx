import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export const AddGoalUI = ({ goals }) => {
  const [showInputCard, setShowInputCard] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [baseamount, setBaseamount] = useState(0);
  const handleAddGoal = () => {
    setShowInputCard(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3002/level/user/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Goals fetched successfully:", response.data);
        setBaseamount(response.data.user.expectedSaving);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3002/level/goal/postgoal",
        { title: name, targetAmount: amount, duration: duration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Goal added successfully:", response.data);
      setShowInputCard(false);
      setName("");
      setDuration("");
      setAmount("");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleCancel = () => {
    setShowInputCard(false);
    setName("");
    setDuration("");
    setAmount("");
  };

  return (
    <div className="max-h-[100vh] flex justify-center items-center">
      <div className="bg-[#D6DDFC] w-full h-[95%] rounded-xl p-[1rem] flex flex-col gap-8 justify-start items-center">
        <div className="overflow-y-auto max-h-[60vh] gap-4 grid grid-cols-3 grid-flow-row w-full">
          {goals.map((goal) => {
            const percentOfBaseAmount = (
              (baseamount / goal.targetAmount) *
              100
            ).toFixed(2);

            return (
              <div
                key={goal._id} // Assuming goal has an _id field from the server
                className="cols-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold">{goal.title}</h2>
                <p>Duration: {goal.duration} years</p>
                <p>Amount: {goal.targetAmount}</p>
                <Progress value={percentOfBaseAmount} className="w-full" />
              </div>
            );
          })}
        </div>
        <div
          className="w-[5rem] min-h-[5rem] bg-white rounded-full flex justify-center items-center text-[3rem] text-[#4A69F5] cursor-pointer"
          onClick={handleAddGoal}
        >
          <FaPlus className="w-[2rem]" />
        </div>
        {showInputCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Add Goal</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Goal Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full p-2 mb-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="duration"
                  placeholder="Goal Duration (years)"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  className="w-full p-2 mb-4 border rounded-lg"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount Required"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  className="w-full p-2 mb-4 border rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleSubmit}
                  >
                    Start
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
