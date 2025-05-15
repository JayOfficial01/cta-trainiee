import { Link } from "react-router";
import { Input, DragButton } from "@/components/custom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function ForgotPassword() {
  const [user, setUser] = useState("");

  async function handleForgotPassword() {
    const url =
      "https://auth.cta.uat.api.codibot.ai/api/v1.5.0/auth/password/forgot";
    try {
      const request = await axios.post(
        url,
        {
          email: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { data } = request;
      toast(data.message);
      return true;
    } catch (err) {
      return { failure: err.name, message: err.message };
    }
  }

  return (
    <aside className="w-full sm:w-[50vw] md:w-[45vw] flex justify-center items-center pt-[3%] bg-[#05A179] text-white">
      <form className="space-y-6 w-[80%]">
        <div className="mb-4">
          <article className="text-center flex flex-col gap-2 pb-5">
            <h1 className="text-3xl font-black">Forgot Password</h1>
            <h3>Please Enter Your Email to Reset Your Password</h3>
          </article>
          <img src="/loginlogo.png" className="mx-auto mb-7 w-40" alt="" />
          <Input
            className={true}
            type="text"
            value={user}
            onChange={(value) => setUser(value)}
            label={{ text: "Email*", color: "#ffffff" }}
          />
        </div>
        <DragButton
          text="Scroll to send email"
          handleForm={() =>
            handleForgotPassword().then((received) => {
              if (typeof received === "boolean") {
                console.log(received);
              } else {
                toast(`${received.failure}: ${received.message}`);
              }
            })
          }
        />
        <Link
          className="text-sm md:text-base block text-center font-semibold"
          to="/login"
        >
          I Already Have an Account
        </Link>
      </form>
    </aside>
  );
}
