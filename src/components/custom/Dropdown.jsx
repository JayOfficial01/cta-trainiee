import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  trigger,
  children,
  bg,
  position,
  styles,
  onSelectClose,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <article
          className={`absolute  ${position ? position : ""} ${
            bg ? bg : ""
          } shadow-lg rounded-md z-10 whitespace-nowrap ${
            styles ? styles : ""
          }`}
          onClick={() => (onSelectClose ? setOpen(() => false) : "")}
        >
          {children}
        </article>
      )}
    </div>
  );
}
// absolute right-0 bg-white shadow-lg rounded-md z-50
