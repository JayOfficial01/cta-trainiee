import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, Ticket, Description } from "@/components/custom";
import axios from "axios";

export default function Coursedescription({ currUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState({
    name: "",
    thumbnail: "",
    est_learning_time: "",
    description: "",
    category: "",
    prerequisites: "",
  });

  if (!location.state?.id || !location?.state.name) return <Navigate to="/" />;

  useEffect(() => {
    try {
      const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/course/${parseInt(
        location.state.id
      )}`;
      axios
        .get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${currUser.token}`,
          },
        })
        .then((resp) => {
          const {
            name,
            thumbnail,
            category,
            description,
            est_learning_time,
            prerequisites,
          } = resp.data.data;
          setSelectedCourse({
            name: name,
            thumbnail: thumbnail,
            category: category,
            description: description,
            est_learning_time: est_learning_time,
            prerequisites: prerequisites,
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const estimated_time = selectedCourse?.est_learning_time;

  const formattedTime =
    estimated_time &&
    (Math.floor(estimated_time / 60) > 0
      ? `${Math.floor(estimated_time / 60)} hour${
          Math.floor(estimated_time / 60) > 1 ? "s" : ""
        }${estimated_time % 60 > 0 ? ` ${estimated_time % 60} mins` : ""}`
      : `${estimated_time % 60} mins`);

  function GoSlides() {
    navigate("/slides", {
      state: {
        id: parseInt(location.state.id),
        name: location.state.name,
      },
    });
  }
  // px-6
  return (
    <div className="custom-container">
      <div className="py-8 flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-black">
            {selectedCourse.name}
          </p>
        </div>
        <Button hasCourse={true} text="Start Now" onClick={GoSlides} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mx-2 text-center">
        {selectedCourse.thumbnail ? (
          <img
            src={
              selectedCourse.thumbnail
                ? selectedCourse.thumbnail
                : "/cta_dash.png"
            }
            className="w-full h-52 sm:h-64 object-cover rounded-md shadow-lg"
            alt=""
          />
        ) : (
          <Skeleton className="w-full h-52 sm:h-64 object-cover rounded-md" />
        )}
        <Ticket bg="bg-[#007F5F80]" title="21" subTitle="Total Slide" />
        <Ticket
          bg="bg-[#FFAE3380]"
          title={
            <>
              Free <br /> Certificate
            </>
          }
          subTitle="After Completion"
        />
        <Ticket
          bg="bg-[#0063F780]"
          title={formattedTime}
          subTitle="Estimated Learning Time"
        />
      </div>
      <Description
        desc={selectedCourse.description}
        category={selectedCourse.category}
        prerequisites={selectedCourse.prerequisites}
      />
    </div>
  );
}
