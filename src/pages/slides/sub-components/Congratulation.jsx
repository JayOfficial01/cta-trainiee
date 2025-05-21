import { Button } from "@/components/custom";
import "@lottiefiles/lottie-player";
import { useNavigate } from "react-router";

export default function Congratulations({ course }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100%] flex flex-col justify-center items-center bg-emerald-100 rounded-lg text-center gap-5 p-10">
      <div className="bg-transparent">
        <lottie-player
          autoplay
          loop
          src="/lottie4.json"
          className="h-[100%] w-32 sm:w-48 bg-transparent"
        />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-green-600">
        Congratulations!
      </h2>
      <p className="text-lg">You have completed all the slides.</p>
      <Button
        hasCourse={true}
        text="Take Assessment"
        onClick={() => {
          navigate("/assessment", {
            state: { id: course.courseId, name: course.courseName },
          });
        }}
      />
    </div>
  );
}
