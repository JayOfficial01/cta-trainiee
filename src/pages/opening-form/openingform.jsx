import { useEffect, useState } from "react";
import FirstStep from "./first-step";
import SecondStep from "./second-step";
import ThirdStep from "./third-step";
import FourthStep from "./fourth-step";
import { FaAngleLeft } from "react-icons/fa";
import FifthStep from "./fifth-step";
import { Button } from "@/components/custom";

const educationLevels = [
  "Early childhood education",
  "Primary education",
  "Lower secondary education",
  "Upper secondary education",
  "Post-secondary non-tertiary education",
  "Short-cycle tertiary education",
  "Bachelor’s or equivalent",
  "Master’s or equivalent",
  "Doctoral or equivalent",
];

const interestsOptions = [
  { value: "Sports", label: "Sports" },
  { value: "Music", label: "Music" },
  { value: "Travel", label: "Travel" },
  { value: "Reading", label: "Reading" },
  { value: "Coding", label: "Coding" },
  { value: "Others", label: "Others" },
];

export default function OpeningForm() {
  const [activeId, setActiveId] = useState(
    parseInt(localStorage.getItem("form-id")) || 1
  );
  const [progressPercentage, setProgressPercentage] = useState("20");
  const [disabled, setDisabled] = useState(false);
  const [bio, setBio] = useState({
    firstname: "",
    lastname: "",
    date: "",
    course: "",
    interest: [],
    description: "",
  });

  function handleInputChange(key, value) {
    setBio((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    localStorage.setItem("form-id", activeId);
    const { firstname, lastname, date, course, interest, description } = bio;
    switch (activeId) {
      case 1:
        setProgressPercentage("20");
        firstname.length > 0 && lastname.length > 0
          ? setDisabled(false)
          : setDisabled(true);
        return setProgressPercentage("20");
      case 2:
        date ? setDisabled(false) : setDisabled(true);
        return setProgressPercentage("40");
      case 3:
        course ? setDisabled(false) : setDisabled(true);
        return setProgressPercentage("60");
      case 4:
        interest.length > 0 ? setDisabled(false) : setDisabled(true);
        return setProgressPercentage("80");
      case 5:
        description.length > 0 ? setDisabled(false) : setDisabled(true);
        return setProgressPercentage("100");
      default:
        return setProgressPercentage("20");
    }
  }, [activeId, bio]);

  function handleUpdateSettings() {
    const url =
      "https://course.cta.uat.api.codibot.ai/api/v1.5.0/tenant/account/settings";
  }

  return (
    <div
      className="flex items-start justify-center  h-screen fixed top-0 w-full"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #FFF 0%, #DDFFF0 100%)",
      }}
    >
      <div className="absolute top-5 sm:top-10 right-5 sm:right-10">
        <img src="/cta_logo1.png" alt="" className="w-16 sm:w-20 md:24" />
      </div>
      <div className="hidden md:block absolute top-52 lg:top-40 md:right-10 lg:right-20 xl:right-48">
        <img
          src="/openingform-logo.png"
          alt=""
          className=" md:w-[450px] lg:w-[500px] xl:w-[550px]"
        />
      </div>

      <footer className="flex flex-col absolute bottom-20 sm:bottom-10 md:bottom-5 gap-3 text-center text-[#7C7C7C] text-xs sm:text-sm font-semibold">
        <div className="flex gap-5 items-center">
          <h1 className="uppercase">powered by</h1>
          <img src="/codibot_logo.png" alt="" className="w-16 sm:w-auto" />
        </div>
        <p>version 1.5</p>
      </footer>

      <div className="absolute top-0 left-0 w-full h-2 bg-gray-300">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: activeId === 5 ? "100%" : `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="w-full pt-36 px-8 md:pl-20 lg:pl-48">
        {activeId > 1 && (
          <button
            onClick={() => setActiveId(activeId - 1)}
            className="mb-5 flex items-center  hover:text-[#007F5F] text-[#7A7A7A] p-1 rounded text-2xl	 sm:text-xl cursor-pointer"
          >
            <FaAngleLeft /> Go back
          </button>
        )}

        {activeId === 1 && (
          <FirstStep bio={bio} handleInputChange={handleInputChange} />
        )}
        {activeId === 2 && (
          <SecondStep bio={bio} handleInputChange={handleInputChange} />
        )}
        {activeId === 3 && (
          <ThirdStep
            educationLevels={educationLevels}
            bio={bio}
            handleInputChange={handleInputChange}
          />
        )}
        {activeId === 4 && (
          <FourthStep
            interestsOptions={interestsOptions}
            bio={bio}
            handleInputChange={handleInputChange}
          />
        )}
        {activeId === 5 && (
          <FifthStep bio={bio} handleInputChange={handleInputChange} />
        )}
        {/*  Button to go to next step */}
        <Button
          text="Next"
          className={`font-semibold text-sm sm:text-base rounded-full border-[1px] border-[#F5F5F5] mt-7 text-white bg-gradient-to-r hover:scale-105 transition-transform transform duration-200 from-[#007F5F] to-[#01B688] px-6 py-2 shadow-md ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          } disabled:opacity-50 `}
          disable={disabled}
          onClick={() => (activeId < 5 ? setActiveId(activeId + 1) : "")}
        />
      </div>
    </div>
  );
}
