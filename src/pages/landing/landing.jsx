/* eslint-disable react/prop-types */
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

  function GotoSlides(url, courseId, courseName) {
    navigate(url, {
      state: {
        id: courseId,
        name: courseName,
      },
    });
  }

  function handleCourseUpdate(course_id, status, courseName) {
    const url =
      "https://course.cta.uat.api.codibot.ai/api/v1.5.0/course/status";
    axios
      .put(
        url,
        { course_id: course_id, status: status },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${currUser.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        GotoSlides("/slides", course_id, courseName);
      })
      .catch((err) => console.log(err));
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {courses.length === 0 ? (
              <article className="col-span-full">
                <Loader />
              </article>
            ) : (
              filteredCourses.map((course) => {
                return (
                  <Card
                    key={course.course_id}
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
                      handleCourseUpdate(
                        course.course_id,
                        "In Progress",
                        course.course_name
                      )
                    }
                    onCourseDescription={() =>
                      GotoSlides(
                        "/coursedescription",
                        course.course_id,
                        course.course_name
                      )
                    }
                    toSlides={() =>
                      GotoSlides(
                        "/slides",
                        course.course_id,
                        course.course_name
                      )
                    }
                  />
                );
              })
            )}
          </div>
        </div>
      </section>
      <section
        className={`flex flex-row w-[100%] md:w-[25%] justify-between mx-auto mt-10`}
      >
        {totalPages.map((item) => {
          return (
            <div
              className={`px-4 py-2 rounded-full flex items-center justify-center w-10 h-10 cursor-pointer ${item === pageNo
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
