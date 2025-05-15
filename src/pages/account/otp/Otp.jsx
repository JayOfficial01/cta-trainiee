import { useState } from "react";
import OtpInput from "./OtpInput";
import { DragButton } from "@/components/custom";

export default function Otp() {
  const [resending, setResending] = useState(false);
  return (
    <section className="flex h-screen">
      <div className="w-full sm:w-[50vw] md:w-[45vw] flex justify-center items-center pt-[3%] bg-[#05A179] text-white">
        <form className="space-y-6 w-[80%]">
          <img src="/loginlogo.png" className="mx-auto mb-7 w-40" alt="" />
          <div className="mb-4">
            <label className="block text-base mb-2" htmlFor="username">
              Enter the OTP sent to "User"
            </label>
            <article className="flex justify-between align-middle mt-5 mb-5">
              <OtpInput />
            </article>
          </div>
          <DragButton isLoading={false} text="Scroll to confirm OTP" />
          <div className="text-center">
            <button
              type="button"
              className={`text-sm md:text-base block font-semibold mx-auto ${
                resending ? "opacity-50 pointer-events-none" : ""
              }`}
              disabled={resending}
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
