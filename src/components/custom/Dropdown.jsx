import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  state,
  trigger,
  children,
  bg,
  position,
  styles,
  onSelectClose,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isPassed = state !== undefined;
  const hasOpen = isPassed ? state.state : open;
  const setHasOpen = isPassed ? state.setState : setOpen;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHasOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setHasOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {hasOpen ? (
        <article
          className={`absolute  ${position ? position : ""} ${
            bg ? bg : ""
          } shadow-lg z-10 whitespace-nowrap ${styles ? styles : ""}`}
          onClick={() => (onSelectClose ? setHasOpen(false) : "")}
        >
          {children}
        </article>
      ) : (
        ""
      )}
    </div>
  );
}
// absolute right-0 bg-white shadow-lg rounded-md z-50
