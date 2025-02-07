import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  // State variables for Friends category
  const [friendsExp, setFriendsExp] = useState(0);
  const [friendsPriority, setFriendsPriority] = useState(0);
  const [friendsAllowed, setFriendsAllowed] = useState(0);

  // State variables for Food category
  const [foodExp, setFoodExp] = useState(0);
  const [foodPriority, setFoodPriority] = useState(0);
  const [foodAllowed, setFoodAllowed] = useState(0);

  // State variables for Entertainment category
  const [entertainmentExp, setEntertainmentExp] = useState(0);
  const [entertainmentPriority, setEntertainmentPriority] = useState(0);
  const [entertainmentAllowed, setEntertainmentAllowed] = useState(0);

  // State variables for Grocery category
  const [groceryExp, setGroceryExp] = useState(0);
  const [groceryPriority, setGroceryPriority] = useState(0);
  const [groceryAllowed, setGroceryAllowed] = useState(0);

  // State variables for Others category
  const [othersExp, setOthersExp] = useState(0);
  const [othersPriority, setOthersPriority] = useState(0);
  const [othersAllowed, setOthersAllowed] = useState(0);

  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const [got, setGot] = useState(false); // State to track if data has been fetched
  const [wellnessScore, setWellnessScore] = useState(0);
  useEffect(() => {
    const fetchWellnessScore = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/level/priority/wellness",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Wellness Score:", response.data.wellnessScore);
        setWellnessScore(response.data.wellnessScore);
      } catch (error) {
        console.error("Error fetching wellness score:", error);
      }
    };
    fetchWellnessScore();
  }, []);
  // Fetch data from API on component mount
  useEffect(() => {
    const fetchPriority = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3002/level/priority/getpriority",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data); // Log the entire response

        // Destructure response data if available
        const { Friends, Food, Entertainment, Grocery, Others } =
          response.data.priority[0] || {};

        // Update state variables based on fetched data if it exists
        if (Friends) {
          setFriendsExp(Friends.exp);
          setFriendsPriority(Friends.priority);
          setFriendsAllowed(Friends.allowed);
        }
        if (Food) {
          setFoodExp(Food.exp);
          setFoodPriority(Food.priority);
          setFoodAllowed(Food.allowed);
        }
        if (Entertainment) {
          setEntertainmentExp(Entertainment.exp);
          setEntertainmentPriority(Entertainment.priority);
          setEntertainmentAllowed(Entertainment.allowed);
        }
        if (Grocery) {
          setGroceryExp(Grocery.exp);
          setGroceryPriority(Grocery.priority);
          setGroceryAllowed(Grocery.allowed);
        }
        if (Others) {
          setOthersExp(Others.exp);
          setOthersPriority(Others.priority);
          setOthersAllowed(Others.allowed);
        }

        setGot(true); // Flag indicating data has been fetched
      } catch (error) {
        console.error("Error fetching priority:", error);
      }
    };

    fetchPriority();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setSubmitted(true);

    // Construct formData object based on current state
    const formData = {
      Friends: {
        exp: friendsExp,
        priority: friendsPriority,
        allowed: friendsAllowed,
      },
      Food: {
        exp: foodExp,
        priority: foodPriority,
        allowed: foodAllowed,
      },
      Entertainment: {
        exp: entertainmentExp,
        priority: entertainmentPriority,
        allowed: entertainmentAllowed,
      },
      Grocery: {
        exp: groceryExp,
        priority: groceryPriority,
        allowed: groceryAllowed,
      },
      Others: {
        exp: othersExp,
        priority: othersPriority,
        allowed: othersAllowed,
      },
    };

    try {
      let response;
      if (got) {
        // If data doesn't exist, create it
        response = await axios.post(
          "http://localhost:3002/level/priority/postpriority",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Priority added successfully:", response.data);
        setGot(true); // Set got to true after successful creation
      }
    } catch (error) {
      console.error("Error adding/updating priority:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-start ml-[5rem]">
      <div className="relative flex flex-row w-[60%] justify-between py-8">
        <h1 className="text-3xl font-bold py-8 px-8">Profile</h1>
        <div className=" w-[10vw] h-20 border-2 border-gray-400 flex flex-col justify-center items-start p-2 rounded-lg">
          <h1 className="text-lg font-medium">Wellness Score</h1>
          <p className="text-lg font-extrabold">{wellnessScore}</p>
        </div>
      </div>

      <div className="ml-5 w-60% gap-4 mt-8 border-2 border-border">
        {!got ? (
          <form className="space-y-4 grid grid-cols-3 gap-4">
            {/* Friends */}
            <div className="col-span-1">
              <label
                htmlFor="friendsExp"
                className="block text-sm font-medium text-gray-700"
              >
                Friends Expected Amount
              </label>
              <input
                type="number"
                id="friendsExp"
                value={friendsExp}
                onChange={(e) => setFriendsExp(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="friendsPriority"
                className="block text-sm font-medium text-gray-700"
              >
                Friends Priority
              </label>
              <input
                type="number"
                id="friendsPriority"
                value={friendsPriority}
                onChange={(e) => setFriendsPriority(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="friendsAllowed"
                className="block text-sm font-medium text-gray-700"
              >
                Friends Allowed Amount
              </label>
              <input
                type="number"
                id="friendsAllowed"
                value={friendsAllowed}
                onChange={(e) => setFriendsAllowed(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Food */}
            <div className="col-span-1">
              <label
                htmlFor="foodExp"
                className="block text-sm font-medium text-gray-700"
              >
                Food Expected Amount
              </label>
              <input
                type="number"
                id="foodExp"
                value={foodExp}
                onChange={(e) => setFoodExp(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="foodPriority"
                className="block text-sm font-medium text-gray-700"
              >
                Food Priority
              </label>
              <input
                type="number"
                id="foodPriority"
                value={foodPriority}
                onChange={(e) => setFoodPriority(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="foodAllowed"
                className="block text-sm font-medium text-gray-700"
              >
                Food Allowed Amount
              </label>
              <input
                type="number"
                id="foodAllowed"
                value={foodAllowed}
                onChange={(e) => setFoodAllowed(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Entertainment */}
            <div className="col-span-1">
              <label
                htmlFor="entertainmentExp"
                className="block text-sm font-medium text-gray-700"
              >
                Entertainment Expected Amount
              </label>
              <input
                type="number"
                id="entertainmentExp"
                value={entertainmentExp}
                onChange={(e) => setEntertainmentExp(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="entertainmentPriority"
                className="block text-sm font-medium text-gray-700"
              >
                Entertainment Priority
              </label>
              <input
                type="number"
                id="entertainmentPriority"
                value={entertainmentPriority}
                onChange={(e) => setEntertainmentPriority(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="entertainmentAllowed"
                className="block text-sm font-medium text-gray-700"
              >
                Entertainment Allowed Amount
              </label>
              <input
                type="number"
                id="entertainmentAllowed"
                value={entertainmentAllowed}
                onChange={(e) => setEntertainmentAllowed(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Grocery */}
            <div className="col-span-1">
              <label
                htmlFor="groceryExp"
                className="block text-sm font-medium text-gray-700"
              >
                Grocery Expected Amount
              </label>
              <input
                type="number"
                id="groceryExp"
                value={groceryExp}
                onChange={(e) => setGroceryExp(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="groceryPriority"
                className="block text-sm font-medium text-gray-700"
              >
                Grocery Priority
              </label>
              <input
                type="number"
                id="groceryPriority"
                value={groceryPriority}
                onChange={(e) => setGroceryPriority(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="groceryAllowed"
                className="block text-sm font-medium text-gray-700"
              >
                Grocery Allowed Amount
              </label>
              <input
                type="number"
                id="groceryAllowed"
                value={groceryAllowed}
                onChange={(e) => setGroceryAllowed(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Others */}
            <div className="col-span-1">
              <label
                htmlFor="othersExp"
                className="block text-sm font-medium text-gray-700"
              >
                Others Expected Amount
              </label>
              <input
                type="number"
                id="othersExp"
                value={othersExp}
                onChange={(e) => setOthersExp(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="othersPriority"
                className="block text-sm font-medium text-gray-700"
              >
                Others Priority
              </label>
              <input
                type="number"
                id="othersPriority"
                value={othersPriority}
                onChange={(e) => setOthersPriority(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="othersAllowed"
                className="block text-sm font-medium text-gray-700"
              >
                Others Allowed Amount
              </label>
              <input
                type="number"
                id="othersAllowed"
                value={othersAllowed}
                onChange={(e) => setOthersAllowed(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="col-span-3 max-w-15vw bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 focus:outline-none"
              onClick={handleSubmit}
            >
              Save
            </button>
          </form>
        ) : (
          <div className="ml-5 w-[55vw] h-[55vh] gap-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Saved Data</h2>
            <div className="grid grid-cols-3 gap-4 h-[75%]">
              <div className="h-[1vh] flex flex-col gap-4">
                <p className="text-xl font-bold text-gray-700 ">Friends</p>
                <p>Expected Amount: {friendsExp}</p>
                <p>Priority: {friendsPriority}</p>
                <p>Allowed Amount: {friendsAllowed}</p>
              </div>

              <div className="h-[1vh] flex flex-col gap-4">
                <p className="text-xl font-bold text-gray-700">Food</p>
                <p>Expected Amount: {foodExp}</p>
                <p>Priority: {foodPriority}</p>
                <p>Allowed Amount: {foodAllowed}</p>
              </div>

              <div className="h-[1vh] flex flex-col gap-4">
                <p className="text-xl font-bold text-gray-700">Entertainment</p>
                <p>Expected Amount: {entertainmentExp}</p>
                <p>Priority: {entertainmentPriority}</p>
                <p>Allowed Amount: {entertainmentAllowed}</p>
              </div>

              <div className="h-[1vh] flex flex-col gap-4">
                <p className="text-xl font-bold text-gray-700">Grocery</p>
                <p>Expected Amount: {groceryExp}</p>
                <p>Priority: {groceryPriority}</p>
                <p>Allowed Amount: {groceryAllowed}</p>
              </div>

              <div className="h-[1vh] flex flex-col gap-4">
                <p className="text-xl font-bold text-gray-700">Others</p>
                <p>Expected Amount: {othersExp}</p>
                <p>Priority: {othersPriority}</p>
                <p>Allowed Amount: {othersAllowed}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
