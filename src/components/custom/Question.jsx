export default function Question({
  id,
  question,
  options,
  checked,
  onClick,
  questionNo,
}) {
  return (
    <div className="flex items-start mt-10 mb-10 w-[95%] mx-auto gap-4">
      <div className="w-6 sm:w-12 h-6 sm:h-12 bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-full border border-blue-800 shrink-0"></div>
      <article>
        <p className="font-bold text-lg">{questionNo + question}</p>
        <div className="flex flex-wrap gap-4 mt-3">
          {options.map((option) => {
            return (
              <button
                key={option.option}
                onClick={() => onClick(option.option)}
                className={`border-1 border-zinc-400 w-fit p-3 cursor-pointer font-semibold rounded-md ${
                  checked.some(
                    (check) =>
                      check.assessment_id === id &&
                      check.answer === option.option
                  )
                    ? "bg-emerald-700 text-white"
                    : "bg-none text-zinc-400 hover:bg-emerald-100"
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </article>
    </div>
  );
}
