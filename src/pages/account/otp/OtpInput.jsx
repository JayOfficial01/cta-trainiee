import { useRef, useReducer } from "react";
import { handleOTP } from "./handleOTP";

export default function OtpInput() {
  const [input, dispatch] = useReducer(
    handleOTP,
    Array.from({ length: 6 }, (_, i) => ({ index: i, value: "" }))
  );

  const inputRef = useRef([]);

  return input.map((elem, index) => {
    return (
      <input
        key={elem.index}
        value={elem.value}
        ref={(node) => (inputRef.current[index] = node)}
        onChange={(e) => {
          dispatch({
            type: "onChange",
            event: e,
            id: elem.index,
            ref: inputRef,
          });
        }}
        onKeyDown={(e) => {
          dispatch({
            type: "onBackspace",
            event: e,
            id: elem.index,
            ref: inputRef,
          });
        }}
        onPaste={(e) => {
          dispatch({
            type: "onPaste",
            event: e,
            id: elem.index,
            ref: inputRef,
          });
        }}
        maxLength={1}
        className="w-10  py-3 text-center rounded-sm appearance-none text-sm sm:text-base border border-white  text-gray-700 bg-[#FDFDFD] leading-tight focus:outline-none 
    focus:ring-2 focus:ring-[#F2C146] transition duration-300 ease-in-out mt-5 mb-5"
      />
    );
  });
}
