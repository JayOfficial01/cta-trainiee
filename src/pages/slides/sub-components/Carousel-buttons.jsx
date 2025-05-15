import { useSelector } from "react-redux";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Button } from "@/components/custom";
import { ExitFullScreen } from "../handle-fn/FullScreenConfig";

export default function CarouselButtons({
  setCurrentSlide,
  currentSlide,
  hasSlidesTaken,
  setHasSlidesTaken,
  quizLoading,
  quizTaken,
  setQuizLoading,
  setQuizTaken,
  goToQuiz,
}) {
  const slides = useSelector((state) => state.slides.slides);
  const length = slides.length;

  const handleNext = () => {
    if (currentSlide === slides.length) {
      return setHasSlidesTaken(() => true);
    }
    if (
      slides[currentSlide]?.quiz &&
      slides[currentSlide]?.slide_content &&
      slides[currentSlide]?.notes
    ) {
      if (quizTaken.includes(currentSlide)) {
        return setCurrentSlide((prev) => prev + 1);
      }
      const { slide_content, notes } = slides[currentSlide];
      setQuizTaken((prev) => [...prev, currentSlide]);
      setQuizLoading(() => true);
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        ExitFullScreen();
      }
      return goToQuiz(slide_content, notes, slides[currentSlide]?.mandatory);
    }
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentSlide === length) {
      setHasSlidesTaken(() => false);
      return setCurrentSlide((prev) => prev - 1);
    }
    if (currentSlide === 1) return;
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <div className="flex justify-between items-center mt-15">
      <Button
        className={`border border-[#000000] hover:border-gray-500 rounded-full p-3 text-2xl  text-[#000000] hover:text-gray-500 active:bg-gray-300 transition-all 
        duration-300 ${
          quizLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disable={quizLoading}
        onClick={handlePrev}
      >
        <HiOutlineArrowNarrowLeft aria-disabled={quizLoading} />
      </Button>
      {!hasSlidesTaken && (
        <div className="bg-[#007F5F80] relative flex flex-col items-center justify-center p-5 gap-2 w-36 h-20 rounded-xl overflow-hidden">
          {/* Overlay for progress */}
          <div
            className="absolute top-0 left-0 h-full bg-[#FFCC00] transition-all duration-300"
            style={{
              width: `${(currentSlide / length) * 100}%`,
            }}
          ></div>

          <h1 className="relative text-base font-bold pb-0">
            {currentSlide} / {length}
          </h1>
          <p className="relative font-semibold text-base">Current Slide</p>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full"></div>
        </div>
      )}
      <Button
        onClick={handleNext}
        disable={quizLoading}
        className={`border border-[#000000] hover:border-gray-500 rounded-full p-3  text-2xl text-[#000000] hover:text-gray-500 active:bg-gray-300
                    transition-all duration-300 ${
                      quizLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
      >
        <HiOutlineArrowNarrowRight aria-disabled={quizLoading} />
      </Button>
    </div>
  );
}
