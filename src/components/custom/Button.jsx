export default function Button({
  text,
  className,
  disable,
  onClick,
  bg,
  hasCard,
  hasCourse,
  hasScore,
  children,
}) {
  const themes = {
    cardBtn: `font-semibold rounded-lg text-white bg-gradient-to-r cursor-pointer p-2 hover:scale-105 transition-transform transform duration-200 ${bg} shadow-md text-sm`,
    courseBtn: `px-4 sm:px-6 py-3 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-lg font-semibold shadow-md hover:scale-105 transform transition-all duration-300 text-sm sm:text-base text-white w-full sm:w-auto cursor-pointer`,
    successBtn: `px-4 py-2 bg-emerald-700 rounded-lg border border-emerald-300 cursor-pointer text-neutral-100 text-sm sm:text-base font-semibold font-['Plus Jakarta Sans'] 
          leading-7`,
  };
  return (
    <button
      className={
        hasCard
          ? themes.cardBtn
          : hasCourse
          ? themes.courseBtn
          : hasScore
          ? themes.successBtn
          : className
      }
      disabled={disable}
      aria-disabled={disable}
      onClick={() => onClick()}
    >
      {text ? text : children}
    </button>
  );
}
