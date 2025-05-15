export default function Heading({ answered, total }) {
  const percentage = Math.floor((answered / total) * 100);
  return (
    <div className="w-[95%] sticky top-0 mx-auto flex flex-col md:flex-row justify-between items-center mt-10">
      <div className="bg-[#007F5F] w-[100%] md:w-[49.5%] text-white p-12 rounded-md"></div>

      <div className="bg-[#007F5F] w-[100%] mt-5 md:mt-0 md:w-[49.5%] p-4 rounded-md flex flex-row gap-7 items-center">
        <div className="progress-ring">
          <div
            className="progress-ring__circle"
            style={{
              background: `conic-gradient(white ${
                percentage ? percentage * 3.6 : 0
              }deg, #ffffff33 ${percentage ? percentage * 3.6 : 0}deg)`,
              transition: "background 1s ease", // This will animate the progress ring smoothly
            }}
          ></div>
          <div className="progress-ring__inner">
            <span className="text-white font-bold text-sm">
              {percentage ? percentage : 0}%
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">
            Summary for Assessment
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-200">
            {answered} out of {total} Questions Completed
          </p>
        </div>
      </div>
    </div>
  );
}
