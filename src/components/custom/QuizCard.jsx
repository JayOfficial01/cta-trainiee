import { useState } from "react";
import { Button } from "@/components/custom";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import QuizCongrats from "@/pages/quiz/QuizCongrats";

export default function QuizCard({
  quizes,
  setShowQuiz,
  mandatory,
  courseId,
  courseName,
  currentSlide,
}) {
  const [answers, setAnswers] = useState(0);
  const [congrats, setCongrats] = useState(false);
  const [current, setCurrent] = useState(0);
  const [check, setCheck] = useState(null);
  const [time, setTime] = useState(Date.now());

  function handleNext(index) {
    if (!check) {
      return toast("Select some option");
    }
    setCheck(null);
    if (index + 1 === quizes.length) {
      setCongrats(() => true);
      return setCurrent(0);
    }
    setCurrent(index + 1);
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
          <QuizCongrats
            answers={answers}
            length={quizes.length}
            setShowQuiz={setShowQuiz}
            startTime={time}
            courseId={courseId}
            courseName={courseName}
            currentSlide={currentSlide}
          />
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
