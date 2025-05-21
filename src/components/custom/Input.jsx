import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function Input({
  type,
  value,
  onChange,
  className,
  disable,
  label,
  placeholder,
  parentWidth,
  icon,
  iconStyles,
  onIconPress,
  onKeyPress,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const theme = {
    account:
      "w-full bg-white p-3 outline-none rounded-md text-black transition duration-300 ease-in-out block focus:shadow-[0_0_0_2px_#fbbf24]",
    labelDefault: "text-sm block mb-2 text-black",
  };
  return (
    <div className={`flex flex-col gap-1 ${parentWidth ? parentWidth : ""}`}>
      {label ? (
        <label
          className={
            typeof label?.styles === "boolean"
              ? theme.labelDefault
              : label?.styles
          }
        >
          {label?.text}
        </label>
      ) : (
        ""
      )}
      <div
        className={`${
          type === "password" || icon
            ? "flex flex-row justify-between items-center relative"
            : ``
        }`}
      >
        <input
          className={typeof className === "boolean" ? theme.account : className}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disable}
          onKeyDown={(e) => onKeyPress(e)}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          placeholder={placeholder}
        />
        {type === "password" && (
          <span
            className="text-gray-500 cursor-pointer absolute right-2  bg-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        )}
        {icon && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onIconPress();
            }}
            className={`cursor-pointer absolute right-2 ${iconStyles}`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

// transition duration-300 ease-in-out shadow-[0_0_0_2px] shadow-amber-300"
