import { useState } from "react";
import { Link } from "react-router";
import { handleLogin } from "./handleLogin";
import { useDispatch } from "react-redux";
import { setSign } from "@/pages/redux/log-indicator";
import { useNavigate } from "react-router";
import { Input, DragButton } from "@/components/custom";
import { toast } from "sonner";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bio, setBio] = useState({
    email: "",
    password: "",
    check: false,
  });

  return (
    <aside className="w-full sm:w-[50vw] md:w-[45vw] flex justify-center items-center pt-[3%] h-[100%] bg-[#05A179]">
      <form className="space-y-6 w-full lg:w-[80%] px-10 sm:px-5 text-white">
        <div className="flex flex-col items-center gap-2 mb-14">
          <picture className="flex mb-5">
            <img
              src="./assets/dar-e-arqam-clg-logo.png"
              alt="Dar-e-arqam Logo"
              className="w-[300px]"
            />
          </picture>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide uppercase">
            Welcome!
          </h1>
          <h2>Sign in to your account</h2>
        </div>
        <div className="mb-6">
          <Input
            className={true}
            value={bio.email}
            onChange={(value) => setBio({ ...bio, email: value })}
            type="email"
            label={{
              text: "Email*",
              styles: "block text-sm sm:text-base mb-2 #ffffff",
            }}
          />
        </div>
        <div className="mb-6">
          <Input
            className={true}
            value={bio.password}
            onChange={(value) => setBio({ ...bio, password: value })}
            type="password"
            label={{
              text: "Password*",
              styles: "block text-sm sm:text-base mb-2 #ffffff",
            }}
          />
        </div>

        <DragButton
          text="Scroll to Login"
          handleForm={() =>
            handleLogin(bio).then((signed) => {
              if (typeof signed === "boolean") {
                navigate("/otp");
                dispatch(setSign());
              } else {
                toast(signed.response.data.message);
              }
            })
          }
        />
        <div className="flex justify-between gap-5 items-baseline w-full flex-wrap">
          <label
            htmlFor="remember-me"
            className="flex items-center cursor-pointer"
          >
            <input
              id="check"
              type="checkbox"
              checked={bio.check}
              onChange={(e) => setBio({ ...bio, check: e.target.checked })}
              className=" h-4 max-md:h-3 w-4 max-md:w-3 mr-2 accent-[#F2C146]"
            />
            <span className="text-xs md:text-sm mb-0.5">Remember me</span>
          </label>
          <Link
            className="text-xs md:text-sm  text-right"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </aside>
  );
}
