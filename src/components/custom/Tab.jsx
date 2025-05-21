import { RiBatterySaverFill } from "react-icons/ri";
import { GrResources } from "react-icons/gr";
import { MdOutlineMicNone } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { useState } from "react";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(null);

  const tabsTitle = [
    {
      id: 1,
      title: (
        <h2
          className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
            activeTab == 1 ? "border-b-4 border-b-emerald-600" : ""
          }
                   transition-all ease-in-out pb-5 text-xl`}
        >
          <RiBatterySaverFill
            size={35}
            className={` ${
              activeTab == 1
                ? "bg-emerald-600 text-white"
                : "bg-[#C0E9D7] text-black"
            } rounded-full p-2 mr-3`}
          />
          Notes
        </h2>
      ),
    },
    {
      id: 2,
      title: (
        <h2
          className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
            activeTab == 2 ? "border-b-4 border-b-emerald-600" : ""
          }
                 transition-all ease-in-out pb-5 text-xl`}
        >
          <GrResources
            size={35}
            className={`${
              activeTab == 2
                ? "bg-emerald-600 text-white border-b-emerald-600"
                : "bg-[#C0E9D7] text-black"
            } rounded-full p-2 mr-3`}
          />
          Resources
        </h2>
      ),
    },
    {
      id: 3,
      title: (
        <h2
          className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
            activeTab == 3 ? "border-b-4 border-b-emerald-600" : ""
          }
                           transition-all ease-in-out pb-5 text-xl`}
        >
          <MdOutlineMicNone
            size={35}
            className={`${
              activeTab == 3
                ? "bg-emerald-600 text-white border-b-emerald-600"
                : "bg-[#C0E9D7] text-black"
            } rounded-full p-2 mr-3`}
          />
          Codi Tutor
        </h2>
      ),
    },
    {
      id: 4,
      title: (
        <h2
          className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
            activeTab == 4 ? "border-b-4 border-b-emerald-600" : ""
          }
                                     transition-all ease-in-out pb-5 text-xl`}
        >
          <BsChatDots
            size={35}
            className={`${
              activeTab == 4
                ? "bg-emerald-600 text-white border-b-emerald-600"
                : "bg-[#C0E9D7] text-black"
            } rounded-full p-2 mr-3`}
          />
          Chat with AI
        </h2>
      ),
    },
  ];

  return (
    <article className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-center">
      {tabsTitle.map((tab) => tab)}
    </article>
  );
}
