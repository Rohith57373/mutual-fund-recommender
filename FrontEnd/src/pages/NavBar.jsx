import { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { TbBooks } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Group1 from "../../public/Group2.svg";

export const NavBar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const navigate = useNavigate();
  const icons = [
    {
      id: 1,
      component: <MdOutlineDashboard className="h-4 w-4" />,
      name: "dashboard",
    },
    { id: 2, component: <FaChartSimple className="h-4 w-4" />, name: "chart" },

    { id: 3, component: <TbBooks className="h-4 w-4" />, name: "books" },
    {
      id: 4,
      component: <AiOutlineStock className="h-4 w-4" />,
      name: "Mutual funds",
    },
    { id: 5, component: <IoPerson className="h-4 w-4 " />, name: "person" },
  ];

  const handleClick = (id) => {
    setActiveIcon(id);
    if (id === 1) {
      navigate("/home");
    } else if (id === 3) {
      navigate("/read");
    } else if (id === 2) {
      navigate("/analytics");
    } else if (id === 5) {
      navigate("/profile");
    } else if (id === 4) {
      navigate("/funds");
    }
  };

  return (
    <div className="bg-white fixed h-screen w-[6rem] flex flex-col justify-start  z-50 p-2  border-r-2 border-gray-200 py-8 px-4">
      <div className=" flex items-center justify-center rounded-lg p-1  mt-6">
        <img src={Group1} alt="" />
      </div>
      <div className="flex flex-col gap-8 items-center justify-start mt-[10vh]">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer relative
              ${
                activeIcon === icon.id
                  ? "bg-primary text-white"
                  : "bg-transparent text-gray-500"
              }
            `}
            onClick={() => handleClick(icon.id)}
            onMouseEnter={() => setActiveIcon(icon.id)}
            onMouseLeave={() => setActiveIcon(null)}
          >
            {icon.component}
            {activeIcon === icon.id && (
              <div className="absolute top-[3rem] left-[2rem] bg-gray-800 text-white px-2 py-1 rounded-md text-sm shadow-lg">
                {icon.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
