import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const [mailId, setMailId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [income, setIncome] = useState("");
  const [balance, setBalance] = useState("");
  const [fixedExpense, setFixedExpense] = useState("");
  const [expectedSaving, setExpectedSaving] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      mailId,
      username,
      password,
      income: parseInt(income), // ensure number type
      balance: parseInt(balance), // ensure number type
      fixedExpense: parseInt(fixedExpense), // ensure number type
      expectedSaving: parseInt(expectedSaving), // ensure number type
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/level/user/signup",
        formData
      );

      const data = response.data;

      // Save token to local storage
      localStorage.setItem("token", data.token);

      // Redirect to home or any other page
      navigate("/home");
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data.message || error.message
      );
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-border min-h-[40rem] min-w-[30rem] max-h-[40rem] max-w-[35rem] rounded-lg flex flex-col items-center p-[3rem] gap-[1rem]">
        <h1 className="text-xl font-semibold text-cardForeground">
          Welcome to LevelUp.Money
        </h1>
        <form
          className="flex flex-col gap-1 mb-[-2rem]"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="mailId">Email</Label>
            <Input
              type="email"
              id="mailId"
              name="mailId"
              placeholder="Email"
              value={mailId}
              onChange={(e) => setMailId(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="income">Income</Label>
            <Input
              type="number"
              id="income"
              name="income"
              placeholder="Monthly Income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="balance">Balance</Label>
            <Input
              type="number"
              id="balance"
              name="balance"
              placeholder="Balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="fixedExpense">Fixed Expense</Label>
            <Input
              type="number"
              id="fixedExpense"
              name="fixedExpense"
              placeholder="Fixed Expense"
              value={fixedExpense}
              onChange={(e) => setFixedExpense(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="expectedSaving">Expected Saving</Label>
            <Input
              type="number"
              id="expectedSaving"
              name="expectedSaving"
              placeholder="Expected Saving"
              value={expectedSaving}
              onChange={(e) => setExpectedSaving(e.target.value)}
              required
            />
          </div>
          <Button size="lg" type="submit">
            Signup
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-5">
          Already signed in?{" "}
          <Link to="/logedin" className="text-primary">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
