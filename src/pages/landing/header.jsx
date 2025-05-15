import { useEffect, useState } from "react";
import { FaChevronDown, FaGraduationCap, FaSignOutAlt } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { resetUser } from "../redux/user-slice";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Dropdown } from "@/components/custom";

export default function Header({ currUser }) {
  const dispatch = useDispatch();
  const [bio, setBio] = useState({
    firstname: "",
    lastname: "",
    profile_pic: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const url =
        "https://course.cta.uat.api.codibot.ai/api/v1.5.0/tenant/account/settings";
      (async () => {
        try {
          const isFetch = await fetch(url, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${currUser.token}`,
            },
          });
          if (isFetch.status != 200) {
            return console.log(err);
          }
          const isResp = await isFetch.json();
          const { first_name, last_name, profile_pic } = isResp.data;
          return setBio({
            firstname: first_name,
            lastname: last_name,
            profile_pic: profile_pic,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(resetUser());
    navigate("/login");
  }

  return (
    <header className="border-b border-gray-300 shadow-md bg-gradient-to-r from-gray-50 to-gray-100 ">
      <article className="custom-container mx-auto flex justify-between items-center  py-1">
        <Link to="/">
          <img
            src="/cta_logo1.png"
            className="w-16 cursor-pointer h-14 object-cover transform hover:scale-105 transition-transform duration-300"
            alt="CTA Logo"
          />
        </Link>
        <div className="flex items-center gap-4 ms-2">
          <div className=" font-semibold">
            Hi, {bio.firstname + " " + bio.lastname}
          </div>
          <div className="relative">
            <img
              src={bio?.profile_pic ? bio.profile_pic : "/stdlogo2.png"}
              className="w-14 h-14 cursor-pointer rounded-full object-cover border-2 border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-300"
              alt="Student Logo"
            />
          </div>
          <div className="relative inline-block text-left">
            <Dropdown
              trigger={
                <FaChevronDown className="text-lg font-light cursor-pointer" />
              }
              position="right-0"
              bg="bg-white"
              onSelectClose={true}
              styles="flex flex-col py-2"
            >
              <div
                className="flex flex-row items-center hover:bg-zinc-100 cursor-pointer p-2"
                onClick={() => navigate("/")}
              >
                <FaGraduationCap className="text-green-600 block" />
                <p className="ml-5 text-black">My Courses</p>
              </div>
              <div
                className="flex flex-row items-center hover:bg-zinc-100 cursor-pointer p-2"
                onClick={() => navigate("/account-setting")}
              >
                <FaGraduationCap className="text-green-600 block" />
                <p className="ml-5 text-black">Account Setting</p>
              </div>
              <div
                className="flex flex-row items-center hover:bg-zinc-100 cursor-pointer p-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-green-600 block" />
                <p className="ml-5 text-black">Logout</p>
              </div>
            </Dropdown>
          </div>
        </div>
      </article>
    </header>
  );
}
