export default function Ticket({ bg, title, subTitle }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${bg}  p-6 rounded-lg shadow-md h-52 sm:h-64`}
    >
      <p className="text-xl sm:text-2xl font-bold text-black">{title}</p>
      <p className="text-sm sm:text-lg font-medium text-black mt-1">
        {subTitle}
      </p>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
      <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
    </div>
  );
}
// bg-[#007F5F80]
