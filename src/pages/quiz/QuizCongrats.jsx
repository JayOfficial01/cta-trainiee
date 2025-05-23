import "@lottiefiles/lottie-player";
import { Button } from "@/components/custom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function QuizCongrats({
  answers,
  length,
  setShowQuiz,
  startTime,
  courseId,
  courseName,
  currentSlide,
}) {
  const currUser = useSelector((state) => state.user);
  const meta = useSelector((state) => state.meta);
  const slides = useSelector((state) => state.slides.slides);

  useEffect(() => {
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000;

    const payload = {
      event_id: JSON.stringify(Date.now()),
      student_id: currUser.id,
      student_level: currUser.education,
      course_id: JSON.stringify(courseId),
      course_title: courseName,
      event_type: "short_assessment",
      timestamp: new Date(Date.now()).toISOString(),
      session_id: JSON.stringify(Date.now()),
      interaction_type: "submission",
      metadata: meta,
      data: {
        context: "assessment_short",
        details: {
          slide_title: slides[currentSlide - 1]?.slide_title || "Unknown Title",
          slide_no: currentSlide,
          start_time: startTime,
          end_time: endTime,
          duration_mins: Math.round(timeSpent / 60),
          score: answers,
        },
      },
    };

    const url =
      "https://reporting.cta.uat.api.codibot.ai/api/v1/analytics/event";
    axios
      .post(url, payload, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-center">
      <lottie-player
        autoplay
        loop
        src="/lottie4.json"
        className="w-[100%] h-[300px]"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-emerald-700 font-bold text-2xl">
          Short Quiz Completed!
        </h2>
        <p>
          You Scored:{" "}
          <span className="text-emerald-700 font-bold text-2xl">
            {answers}/{length}
          </span>
        </p>
        <div className="items-center mt-2">
          <Button
            className="w-fit text-sm sm:text-base border border-slate-400 px-4 py-2 rounded-md bg-[#007F5F] cursor-pointer text-white hover:bg-[#005f4f]"
            text="Close"
            onClick={() => setShowQuiz(() => false)}
          />
        </div>
      </div>
    </div>
  );
}
