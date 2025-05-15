import { Navigate, useLocation, useNavigate } from "react-router";
import "@lottiefiles/lottie-player";
import { Button } from "@/components/custom";

export default function SuccessScore() {
  const location = useLocation();
  if (!location.state?.percentage) return <Navigate to="/" />;

  const navigate = useNavigate();

  const percentage = parseInt(location.state?.percentage);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white relative text-center px-2 sm:px-0">
      <div className="absolute top-5 right-5 md:right-16">
        <img src="/cta_logo1.png" alt="" className="w-16 sm:w-20" />
      </div>

      <div>
        <lottie-player
          autoplay
          loop
          src={percentage < 50 ? "/lottie5.json" : "/lottie.json"}
          className="h-[100%] w-80 sm:w-[400px] lg:w-[400px]"
        ></lottie-player>
      </div>
      <div className="flex flex-col items-center mt-3 z-50">
        <h1 className="text-black text-2xl sm:text-4xl font-semibold font-['Plus Jakarta Sans'] mb-4">
          {percentage < 50 ? "Better Luck Next Time!" : "Congratulations"}
        </h1>
        <p className="text-xl sm:text-3xl font-semibold text-black font-['Plus Jakarta Sans']">
          You Scored{" "}
          <span className="text-emerald-500 font-extrabold">
            : {Math.floor(percentage)}%{" "}
            <span className="text-sm text-black">(Passing Marks = 50%)</span>
          </span>
        </p>
      </div>

      <div className="flex gap-5 mt-5 z-50">
        <Button
          hasScore={true}
          onClick={() => navigate("/")}
          text="Go to Courses"
        />

        <Button
          hasScore={true}
          onClick={() =>
            navigate("/slides", {
              state: {
                id: location.state?.courseId,
                name: location.state?.courseName,
              },
            })
          }
          text="Go to Slides"
        />
      </div>
    </section>
  );
}
