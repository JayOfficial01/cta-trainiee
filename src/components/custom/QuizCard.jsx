import { useState } from "react";
import { Button } from "@/components/custom";
import "@lottiefiles/lottie-player";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

export default function QuizCard({
  quizes,
  setShowQuiz,
  mandatory,
  courseId,
  courseName,
  currentSlide,
}) {
  const currUser = useSelector((state) => state.user);
  const meta = useSelector((state) => state.meta);
  const slides = useSelector((state) => state.slides.slides);
  const [answers, setAnswers] = useState(0);
  const [congrats, setCongrats] = useState(false);
  const [current, setCurrent] = useState(0);
  const [check, setCheck] = useState(null);
  const startTime = Date.now();

  function handleNext(index) {
    if (!check) {
      return toast("Select some option");
    }
    setCheck(null);
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

    if (index + 1 === quizes.length) {
      setCongrats(() => true);
      return setCurrent(0);
    }
    setCurrent(index + 1);
    axios
      .post(url, payload, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      })
      .catch((err) => console.log(err));
  }

  function handleAnswers(selectedOption, mainAnswer) {
    if (check) return;
    if (selectedOption === mainAnswer) {
      setAnswers((prev) => prev + 1);
    }
    setCheck(selectedOption);
  }

  return (
    <>
      {!mandatory && (
        <div className="w-[95%] md:w-[50%] flex justify-end mb-5 cursor-pointer">
          <RxCross2
            size={23}
            strokeWidth="2"
            className="text-white"
            onClick={() => setShowQuiz(() => false)}
          />
        </div>
      )}
      <article className="bg-white w-[95%] md:w-[50%] p-8 rounded-md">
        {congrats ? (
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
                  {answers}/{quizes.length}
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
        ) : (
          quizes.map(
            (quiz, index) =>
              current === index && (
                <div key={quiz.answer}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#007F5F]">Quiz</h2>
                    <p className="text-zinc-500">
                      {index + 1} out of {quizes.length}
                    </p>
                  </div>
                  <p className="text-base sm:text-lg font-semibold mt-5 pb-3 border-b-1 border-b-slate-300">
                    {quiz.question}
                  </p>
                  <div className="flex flex-col gap-4 mt-5">
                    {quiz.options.map((option) => (
                      <div
                        // bg-zinc-50
                        className={`flex gap-3  ${
                          !check && "bg-zinc-50 cursor-pointer"
                        } ${
                          check
                            ? option.option === quiz.answer
                              ? "bg-[#007F5F] text-white"
                              : check === option.option
                              ? "bg-red-500 text-white"
                              : "opacity-30 z-0"
                            : ""
                        } rounded-md items-center p-3`}
                        key={option.option}
                        onClick={() =>
                          handleAnswers(option.option, quiz.answer)
                        }
                      >
                        <span
                          className={`border-1 flex border-slate-400 w-[18px] h-[18px] rounded-[3px] justify-center items-center cursor-pointer ${
                            check === option.option ? "" : ""
                          }`}
                        >
                          {check === option.option && "✓"}
                        </span>
                        <p className="text-start text-sm sm:text-base break-words">
                          {option.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="text-end">
                    <Button
                      className="bg-none border-1 rounded-sm text-black border-black hover:text-emerald-400 hover:border-emerald-400 px-5 py-2 mt-10 cursor-pointer"
                      text="Next"
                      onClick={() => handleNext(index)}
                    />
                  </div>
                </div>
              )
          )
        )}
      </article>
    </>
  );
}
// bg-zinc-50
/*
quizes.map(
    (quiz, index) =>
      current === index && (
        <article
          className="bg-white w-[95%] md:w-[50%] p-8 rounded-md"
          key={quiz.answer}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#007F5F]">Quiz</h2>
            <p className="text-zinc-500">
              {index + 1} out of {quizes.length}
            </p>
          </div>
          <p className="text-base sm:text-lg font-semibold mt-5 pb-3 border-b-1 border-b-slate-300">
            {quiz.question}
          </p>
          <div className="flex flex-col gap-4 mt-5">
            {quiz.options.map((option) => (
              <div
                className={`flex gap-3 bg-zinc-50 rounded-md cursor-pointer items-center p-3`}
                key={option.option}
                onClick={() => handleAnswer(option.option)}
              >
                <span
                  className={`border-1 flex border-slate-400 w-[18px] h-[18px] rounded-[3px] justify-center items-center cursor-pointer ${
                    check === option.option ? "" : ""
                  }`}
                >
                  {check === option.option && "✓"}
                </span>
                <p className="text-start text-sm sm:text-base break-words">
                  {option.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-end">
            <Button
              className="bg-none border-1 rounded-sm text-black border-black hover:text-emerald-400 hover:border-emerald-400 px-5 py-2 mt-10 cursor-pointer"
              text="Next"
              onClick={() => handleNext(index)}
            />
          </div>
        </article>
      )
        */
