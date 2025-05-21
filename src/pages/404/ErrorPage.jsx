import { Button } from "@/components/custom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="w-[100vw] h-[100vh] flex flex-col gap-3 justify-center items-center">
      <img src="./cta_logo1.png" alt="Error image" />
      <h2 className="text-emerald-700 text-4xl font-bold">404 Not Found</h2>
      <Button
        className={`px-4 py-2 bg-emerald-700 flex items-center gap-3 rounded-lg border border-emerald-300 cursor-pointer text-neutral-100 text-sm sm:text-base font-semibold
             font-['Plus Jakarta Sans'] 
          leading-7`}
        onClick={() => navigate("/")}
      >
        <FaLongArrowAltLeft size={20} className="text-white" /> Back
      </Button>
    </section>
  );
}
