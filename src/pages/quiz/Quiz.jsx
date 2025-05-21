import { useSelector } from "react-redux";
import QuizCard from "@/components/custom/QuizCard";
import { useEffect } from "react";

export default function Quiz({
  setShowQuiz,
  courseId,
  courseName,
  currentSlide,
}) {
  const { quizes, mandatory } = useSelector((state) => state.quizes);
  console.log(quizes, mandatory);

  useEffect(() => {
    return () => {
      setShowQuiz(() => false);
    };
  });

  return (
    <section
      className="bg-gradient-to-br from-[#60fad3] via-[#17463a] to-[#0e8366] w-[100%] h-[100%] fixed top-0 left-0 overflow-x-hidden flex flex-col 
    justify-center items-center z-100"
    >
      <QuizCard
        quizes={quizes}
        setShowQuiz={setShowQuiz}
        mandatory={mandatory}
        courseId={courseId}
        courseName={courseName}
        currentSlide={currentSlide}
      />
    </section>
  );
}
