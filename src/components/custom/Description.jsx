export default function Description({ desc, category, prerequisites }) {
  return (
    <>
      <div className="mt-8 sm:mt-12 w-full mx-2">
        <p className="font-bold text-lg sm:text-2xl pb-3 text-[#000000]">
          Description
        </p>
        <p className="text-sm sm:text-lg text-[#3A3A3C]">
          {desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
        </p>
      </div>

      <div className="mt-8 sm:mt-12 w-full mx-2">
        <p className="font-bold text-lg sm:text-2xl pb-6 sm:pb-8 text-[#000000]">
          Category
        </p>
        <span className="font-semibold px-4 py-2 text-center text-[#F5F5F5] text-sm  sm:text-base bg-[#3A3A3C] w-auto rounded-md">
          {category}
        </span>
      </div>

      <div className="mt-8 sm:mt-12 w-full mx-2">
        <p className="font-bold text-lg sm:text-2xl pb-3 text-[#000000]">
          Prerequisites
        </p>
        <p className="text-sm sm:text-lg text-[#3A3A3C]">
          {prerequisites ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
        </p>
      </div>
    </>
  );
}
