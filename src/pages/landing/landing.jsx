import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../redux/course-slice";
import Loader from "../loader/Loader";
import { handleCourseDownload } from "./handleCourseDownload";
import { useNavigate } from "react-router";
import { Card } from "@/components/custom";
import axios from "axios";

export default function Landing({ currUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses);
  const [isDownloading, setIsDownloading] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Courses
  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // link Element
  const linkRef = useRef(null);

  useEffect(() => {
    const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/student/courses?page_no=${pageNo}&page_limit=10`;
    axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      })
      .then((resp) => {
        let pages = [];
        for (let i = 1; i <= resp.data.data.metadata.total_pages; i++) {
          pages.push(i);
        }
        dispatch(setCourse(resp.data.data.courses));
        setTotalPages(pages);
      })
      .catch((err) => console.log(err));
  }, [pageNo]);

  function handleSelectCourse(courseId, courseName) {
    navigate("/coursedescription", {
      state: { id: courseId, name: courseName },
    });
  }

  function handleCourseUpdate(course_id, status) {
    // const url =
    //   "https://course.cta.uat.api.codibot.ai/api/v1.5.0/course/status";
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer ${currUser.token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ course_id: course_id, status: status }),
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => console.log(resp))
    //   .catch((err) => console.log(err));
  }

  return (
    <div className="custom-container my-8 mx-auto">
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-8 mb-12">
        <p className="text-xl sm:text-3xl text-center sm:text-start font-bold bg-clip-text leading-none">
          All Courses
        </p>
        <div className="py-2 sm:py-3 px-4 flex gap-4 border border-gray-500 outline-none focus:border-[#01b688] rounded-md sm:w-60 md:w-96">
          <FaSearch className=" text-lg sm:text-xl text-gray-500 w-[18px]" />
          <input
            type="search"
            className="outline-none w-full"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
            {courses.length === 0 ? (
              <article className="col-span-full">
                <Loader />
              </article>
            ) : (
              filteredCourses.map((course) => {
                return (
                  <Card
                    key={course.course_id}
                    courseId={course.course_id}
                    image={course.course_thumbnail}
                    activity={course.course_status}
                    title={course.course_name}
                    level="Advanced Level"
                    time={course.course_duration}
                    isDownloading={isDownloading.includes(course.course_id)}
                    onDownload={() =>
                      handleCourseDownload(
                        course.course_id,
                        currUser.token,
                        course.course_name,
                        setIsDownloading,
                        linkRef.current
                      )
                    }
                    onUpdate={() =>
                      handleCourseUpdate(course.course_id, course.course_status)
                    }
                    onCourseDescription={() =>
                      handleSelectCourse(course.course_id, course.course_name)
                    }
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
      <section
        className={`flex flex-row w-[100%] md:w-[30%] justify-between mx-auto mt-10`}
      >
        {totalPages.map((item) => {
          return (
            <div
              className={`px-4 py-2 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer ${
                item === pageNo
                  ? "bg-gradient-to-r from-[#007F5F] to-[#01B688] text-white"
                  : "bg-white text-[#007F5F] border border-[#007F5F]"
              }`}
              key={item}
              onClick={() => setPageNo(item)}
            >
              {item}
            </div>
          );
        })}
      </section>
      <a ref={linkRef} href="" style={{ maxHeight: "0px", opacity: 0 }}></a>
    </div>
  );
}

// <div
//   className="relative cursor-pointer flex flex-col justify-between space-y-4 transition-transform transform duration-200 hover:scale-105 group bg-[#01A17A33] rounded-3xl p-5 sm:px-8 sm:py-5"
//   key={course.course_id}
//   onClick={(e) => {
//     e.stopPropagation();
//     handleSelectCourse(course.course_id, course.course_name);
//   }}
// >
//   <article>
//     <img
//       src={course.course_thumbnail}
//       className="rounded-md w-full h-20 sm:h-28 object-cover transition-all duration-200 shadow-md group-hover:shadow-blue-200"
//       alt=""
//     />

//     <span
//       className={`absolute top-2 right-3 text-xs font-semibold rounded-full  text-white px-3 py-2 shadow-md z-20 uppercase ${
//         course.course_status === "COMPLETED"
//           ? "bg-gradient-to-r from-[#007F5F] to-[#01B688]"
//           : course.course_status === "IN_PROGRESS"
//           ? "bg-yellow-500"
//           : course.course_status === "ASSIGNED"
//           ? "bg-blue-400"
//           : "bg-transparent" // Default background for unexpected statuses
//       }`}
//     >
//       {course.course_status === "COMPLETED"
//         ? "COMPLETED"
//         : course.course_status === "IN_PROGRESS"
//         ? "In Progress"
//         : course.course_status === "ASSIGNED"
//         ? "ASSIGNED"
//         : ""}
//     </span>
//   </article>
//   <p
//     title={course.course_name}
//     onClick={(e) => {
//       e.stopPropagation();
//       handleSelectCourse(
//         course.course_id,
//         course.course_name
//       );
//     }}
//     className="line-clamp-2 font-bold text-lg md:text-2xl group-hover:text-blue-700 transition-all duration-200 text-[#393939]"
//   >
//     {course.course_name}
//   </p>
//   <div className="flex justify-between text-[#5B5A5A]">
//     <h2 className="font-light text-base">Advanced Level</h2>
//     <p className="font-bold">
//       {Math.floor(course.course_duration / 60) > 0
//         ? `${Math.floor(course.course_duration / 60)} hour${
//             Math.floor(course.course_duration / 60) > 1
//               ? "s"
//               : ""
//           }${
//             course.course_duration % 60 > 0
//               ? ` ${course.course_duration % 60} mins`
//               : ""
//           }`
//         : `${course.course_duration % 60} mins`}
//     </p>
//   </div>
//   <div className=" flex flex-col gap-2">
//     {course.course_status === "COMPLETED" && (
//       <>
//         <button
//           className="font-semibold rounded-lg text-white bg-gradient-to-r cursor-pointer p-2 hover:scale-105 transition-transform transform duration-200 from-[#007F5F]
//            to-[#01B688]  shadow-md text-sm"
//           onClick={(e) => {
//             e.stopPropagation();
//             // navigate("/slides");
//             // navigate("/slides", {
//             //   state: {  },
//             // });

//             // const courseData = {
//             //   course_id: course.course_id,
//             //   title: course.course_name,
//             // };

//             // localStorage.setItem(
//             //   "courseData",
//             //   JSON.stringify(courseData)
//             // );
//           }}
//         >
//           Start Again
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             handleCourseDownload(
//               course.course_id,
//               currUser.token,
//               course.course_name,
//               setIsDownloading,
//               linkRef.current
//             );
//           }}
//           className={`font-semibold rounded-lg text-white p-2 shadow-md text-sm text-center transition-transform transform duration-200 cursor-pointer ${
//             isDownloading.includes(course.course_id)
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105"
//           }`}
//           disabled={
//             isDownloading.includes(course.course_id)
//               ? true
//               : false
//           }
//         >
//           {isDownloading.includes(course.course_id)
//             ? "Downloading..."
//             : "Download Certificate"}
//         </button>
//       </>
//     )}
//     {course.course_status !== "COMPLETED" && (
//       <button
//         className={`font-semibold text-sm rounded-lg  text-white bg-gradient-to-r hover:scale-105 transition-transform cursor-pointer transform duration-200 ${
//           course.course_status === "ASSIGNED"
//             ? "from-[#007F5F] to-[#01B688]"
//             : course.course_status === "IN_PROGRESS"
//             ? "bg-yellow-500"
//             : "bg-blue-500"
//         } px-4 py-2 shadow-md`}
//         onClick={async (e) => {
//           e.stopPropagation();
//           // fetch(
//           //   `https://course.cta.uat.api.codibot.ai/api/v1.5.0/resource?resource_type=content&course_id=${course.course_id}`,
//           //   {
//           //     headers: {
//           //       accept: "application/json",
//           //       Authorization: `Bearer ${currUser.token}`,
//           //     },
//           //   }
//           // )
//           //   .then((resp) => resp.json())
//           //   .then((resp) => console.log(resp))
//           //   .catch((err) => console.log(err));
//           // handleCourseUpdate(course.course_id, "In Progress");
//           // Update the course status to In Progress
//           // try {
//           //   await updateCourseStatus(course.course_id, "In Progress");
//           // } catch (error) {
//           //   console.error("Error updating course status:", error);
//           //   return;
//           // }

//           // Navigate to the course description

//           // navigate("/slides")
//           // navigate("/slides", {
//           //   state: {  },
//           // });

//           // const courseData = {
//           //   course_id: course.course_id,
//           //   title: course.course_name
//           // }

//           // localStorage.setItem("courseData", JSON.stringify(courseData));
//           // navigate("/slides", {
//           //   state: { course_id: course.course_id, title: course.course_name },
//           // });
//           // sessionStorage.setItem("cname", course.course_name);
//         }}
//       >
//         {course.course_status === "ASSIGNED"
//           ? "Start Now"
//           : course.course_status === "IN_PROGRESS"
//           ? "Resume"
//           : "View Certificate"}
//       </button>
//     )}
//   </div>
// </div>
