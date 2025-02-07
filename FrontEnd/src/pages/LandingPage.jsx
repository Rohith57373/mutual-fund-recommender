import { BackgroundBeams } from "@/components/ui/Beams";
import { Button } from "@/components/ui/movingBorder";
import { useNavigate } from "react-router-dom";
import Group1 from "../../public/Group1.svg";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="flex flex-col gap-4   mx-auto p-4">
        <div className="flex flex-col items-center gap-3">
          <img src={Group1} alt="" srcset="" />
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b text-white   text-center font-sans font-extrabold">
            LevelUp.Money
          </h1>
          <p className="text-xl text-primaryForeground tracking-normal">
            Empower Your Finances Learn, Save, Grow
          </p>
          <p className="w-[70%] text-md text-center text-mutedForeground tracking-normal ">
            Welcome to LevelUp.Money! We are your trusted partner in financial
            empowerment, helping you take control of your finances with ease and
            confidence. Our app offers intuitive tools to analyze your spending,
            set achievable financial goals, and provide personalized advice on
            savings and investments. Dive into our wealth of resources and
            unlock your financial potential today. With LevelUp.Money, mastering
            your money has never been more accessible or fun!
          </p>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <Button
            children={"Get Started"}
            borderRadius="1rem"
            containerClassName={"h-[3rem] tracking-wide "}
            className={"cursor-pointer z-50"}
            onClick={() => {
              console.log("Button clicked");
              navigate("/login");
            }}
          />
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};
