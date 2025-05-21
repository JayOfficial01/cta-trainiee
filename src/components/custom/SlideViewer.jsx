import { useEffect, useRef } from "react";

export default function SlideViewer({ loading, content, currentSlide }) {
  const elemRef = useRef(null);

  useEffect(() => {
    elemRef?.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentSlide]);

  return (
    <div
      ref={elemRef}
      className={`h-[52vh] overflow-x-hidden ${
        loading ? "overflow-y-hidden" : "overflow-y-auto"
      } border border-zinc-400 rounded-md relative`}
    >
      {content}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 z-50 h-full rounded-b-xl">
          <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-4 border-green-500"></div>
          <p className="text-white mt-4">Preparing Quiz...</p>
        </div>
      )}
    </div>
  );
}
