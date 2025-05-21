import { Button } from "@/components/custom";

export default function Card(props) {
  const {
    image,
    activity,
    title,
    level,
    time,
    isDownloading,
    onDownload,
    onCourseDescription,
    onUpdate,
    toSlides,
  } = props;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onCourseDescription();
      }}
      className="relative cursor-pointer flex flex-col justify-between space-y-4 transition-transform transform duration-200 hover:scale-105 group bg-[#01A17A33] rounded-3xl p-5 sm:px-8 sm:py-5"
    >
      <article>
        <img
          src={image}
          className="rounded-md w-full h-20 sm:h-28 object-cover transition-all duration-200 shadow-md group-hover:shadow-blue-200"
          alt=""
        />

        <span
          className={`absolute top-2 right-3 text-xs font-semibold rounded-full  text-white px-3 py-2 shadow-md z-20 uppercase ${
            activity === "COMPLETED"
              ? "bg-gradient-to-r from-[#007F5F] to-[#01B688]"
              : activity === "IN_PROGRESS"
              ? "bg-yellow-500"
              : activity === "ASSIGNED"
              ? "bg-blue-400"
              : "bg-transparent" // Default background for unexpected statuses
          }`}
        >
          {activity === "COMPLETED"
            ? "COMPLETED"
            : activity === "IN_PROGRESS"
            ? "In Progress"
            : activity === "ASSIGNED"
            ? "ASSIGNED"
            : ""}
        </span>
      </article>
      <p
        title={title}
        className="line-clamp-2 font-bold text-lg md:text-2xl group-hover:text-blue-700 transition-all duration-200 text-[#393939]"
      >
        {title}
      </p>
      <div className="flex justify-between text-[#5B5A5A]">
        <h2 className="font-light text-base">{level}</h2>
        <p className="font-bold">
          {Math.floor(time / 60) > 0
            ? `${Math.floor(time / 60)} hour${
                Math.floor(time / 60) > 1 ? "s" : ""
              }${time % 60 > 0 ? ` ${time % 60} mins` : ""}`
            : `${time % 60} mins`}
        </p>
      </div>
      <div className=" flex flex-col gap-2">
        {activity === "COMPLETED" && (
          <>
            <Button
              hasCard={true}
              bg="from-[#007F5F] to-[#01B688]"
              text="Start Again"
              onClick={toSlides}
            />
            <Button
              hasCard={true}
              onClick={onDownload}
              bg={
                isDownloading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105"
              }
              disable={isDownloading}
              text={isDownloading ? "Downloading..." : "Download Certificate"}
            />
          </>
        )}
        {activity !== "COMPLETED" && (
          <Button
            hasCard={true}
            bg={
              activity === "ASSIGNED"
                ? "from-[#007F5F] to-[#01B688]"
                : activity === "IN_PROGRESS"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }
            onClick={onUpdate}
            text={
              activity === "ASSIGNED"
                ? "Start Now"
                : activity === "IN_PROGRESS"
                ? "Resume"
                : "View Certificate"
            }
          />
        )}
      </div>
    </div>
  );
}
