import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function DragButton({ text, handleForm }) {
  const scrollRef = useRef(null);
  const elemRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    x: 5,
    rotate: 0,
  });
  const draggingRef = useRef(false);

  const handleMouseDown = () => {
    draggingRef.current = true;
  };

  const handleMouseMove = async (e) => {
    if (!draggingRef.current) return;

    const container = scrollRef.current;
    const handle = elemRef.current;
    const containerRect = container.getBoundingClientRect();

    const mouseX = e.clientX - containerRect.left;
    const max = container.offsetWidth - handle.offsetWidth;
    const clampedX = Math.max(
      0,
      Math.min(mouseX - handle.offsetWidth / 2, max)
    );
    const rotation = (clampedX / container.offsetWidth) * 180;

    if (position.x >= max) {
      draggingRef.current = false;
      setPosition(() => ({
        x: max,
        rotate: 180,
      }));
      setLoading(() => true);
      container.removeEventListener("mousemove", handleMouseMove);
      await handleForm();
      setPosition({
        x: 5,
        rotate: 0,
      });
      return setLoading(() => false);
    }

    setPosition(() => ({
      rotate: rotation,
      x: clampedX,
    }));
  };

  const handleMouseUp = () => {
    draggingRef.current = false;

    const container = scrollRef.current;
    const handle = elemRef.current;
    const max = container.offsetWidth - handle.offsetWidth;

    if (position.x < max) {
      setPosition(() => ({
        x: 5,
        rotate: 0,
      }));
      return setLoading(() => false);
    }
  };

  return (
    <div
      ref={scrollRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-full h-[3rem] bg-[#F2C146] rounded-full font-Glegoo"
    >
      <span className="absolute inset-0 flex items-center justify-center text-white select-none text-sm md:text-lg font-medium">
        {loading ? "loading..." : text}
      </span>
      <div
        onMouseDown={handleMouseDown}
        ref={elemRef}
        className="absolute flex justify-center items-center top-1 sm:top-0.5 bg-white text-[#F2C146] border border-gray-300 rounded-full h-[2.4rem] sm:h-[2.6rem] w-[2.4rem]
        sm:w-[2.6rem] text-lg cursor-grab"
        style={{
          left: `${position.x}px`,
          transform: `rotate(${-position.rotate}deg)`,
        }}
      >
        <FaArrowRight />
      </div>
    </div>
  );
}
