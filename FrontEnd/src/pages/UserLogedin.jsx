import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLoggedIn = () => {
  const navigate = useNavigate();
  const [mailId, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      mailId,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/level/user/signin",
        loginData
      );

      const data = response.data;

      // Save token to local storage
      localStorage.setItem("token", data.token);

      // Redirect to home or any other page
      navigate("/home");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data.message || error.message
      );
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-border min-h-[25rem] min-w-[30rem] max-h-[25rem] max-w-[35rem] rounded-lg flex flex-col items-center p-[3rem] gap-[1rem]">
        <h1 className="text-xl font-semibold text-cardForeground">
          Welcome to LevelUp.Money
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={mailId}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button size="lg" type="submit">
            Login
          </Button>
        </form>
        <p className="text-sm text-gray-600">
          Not signed up?{" "}
          <Link to="/login" className="text-primary">
            Click here
          </Link>{" "}
          to sign up.
        </p>
      </div>
    </div>
  );
};

export default UserLoggedIn;
