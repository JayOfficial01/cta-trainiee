import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSlides, clearSlides } from "../redux/slides-slice";
import Loader from "../loader/Loader";
import "@lottiefiles/lottie-player";
import { handleBlur, handleMouse } from "./handle-fn/handleScreenSaver";
import Congratulations from "./sub-components/Congratulation";
import CarouselButtons from "./sub-components/Carousel-buttons";
import axios from "axios";
import { CiMenuKebab } from "react-icons/ci";
import { Dropdown } from "@/components/custom";
import Resources from "./sub-components/resources";
import { RxCross2 } from "react-icons/rx";
import { ShowFullScreen, ExitFullScreen } from "./handle-fn/FullScreenConfig";
import { SlideConfig } from "./handle-fn/SlideConfig";
import SlideViewer from "@/components/custom/SlideViewer";
import SlideMenu from "./sub-components/slide-menu";
import { toast } from "sonner";
import Quiz from "../quiz/Quiz";
import { setMandatory, setQuizes } from "../redux/quiz-slice";
import { RiBatterySaverFill } from "react-icons/ri";
import { GrResources } from "react-icons/gr";
import { MdOutlineMicNone } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import Notes from "./tabs/notes";
import ResourceTab from "./tabs/resources-tab";

export default function Slides({ currUser }) {
  // To check if the a course is selected
  const location = useLocation();
  if (!location.state?.id || !location.state?.name) return <Navigate to="/" />;

  // Redux
  const slides = useSelector((state) => state.slides.slides);
  const dispatch = useDispatch();

  // states
  const [currentSlide, setCurrentSlide] = useState(
    parseInt(localStorage.getItem(`${location.state?.id}currentSlide`)) || 1
  );
  const [screenSaver, setScreenSaver] = useState(false);
  const [hasSlidesTaken, setHasSlidesTaken] = useState(false);
  const [docSearch, setDocSearch] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizTaken, setQuizTaken] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  // Refs
  const startTimeRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const viewFullScreen = useRef(null);

  useEffect(() => {
    try {
      const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/resource?resource_type=content&course_id=${parseInt(
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
          dispatch(setSlides(resp.data.resources));
          console.log(resp.data.resources);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${location.state?.id}currentSlide`, currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    function handleScreen() {
      setShowFullscreen(
        !!document.fullscreenElement || !!document.webkitFullscreenElement
      );
    }

    document.addEventListener("fullscreenchange", handleScreen);
    document.addEventListener("webkitfullscreenchange", handleScreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleScreen);
      document.removeEventListener("webkitfullscreenchange", handleScreen);
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("clicked");
      dispatch(clearSlides());
    };
  }, []);

  const fetchQuiz = async (content, notes) => {
    const url =
      "https://ai.cta.uat.api.codibot.ai/api/v1.5.0/ai/short/assessment";
    const response = await axios.post(
      url,
      { course_id: location.state?.id, content, notes, language: "English" },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      }
    );
    return response.data.data;
  };

  return slides.length === 0 ? (
    <article className="col-span-full">
      <Loader />
    </article>
  ) : screenSaver ? (
    <div className="fixed top-30 left-1/2 -translate-x-1/2">
      <lottie-player
        autoplay
        loop
        src="/fullscreen.json"
        background="transparent"
      ></lottie-player>
    </div>
  ) : (
    <>
      {showResources && (
        <Resources
          token={currUser.token}
          courseId={location.state?.id}
          onClose={setShowResources}
        />
      )}

      {showQuiz && <Quiz setShowQuiz={setShowQuiz} />}

      <div className="custom-container flex justify-between items-center pt-5 pb-2  relative">
        <p className="font-bold text-xl xl:text-3xl text-[#3A3A3C] w-[60%] sm:w-auto">
          {location.state.name}
        </p>
        <Dropdown
          trigger={<CiMenuKebab size={32} />}
          position="top-0 right-[30px]"
          bg="bg-neutral-100"
          styles="flex flex-col gap-5 px-3 py-5 border border-slate-300 shadow-none cursor-pointer"
        >
          <SlideMenu
            setShowResources={setShowResources}
            setWebSearch={setWebSearch}
            setDocSearch={setDocSearch}
            docSearch={docSearch}
            webSearch={webSearch}
            onShow={() => ShowFullScreen(viewFullScreen)}
            courseId={location.state?.id}
            courseName={location.state?.name}
          />
        </Dropdown>
      </div>

      <section
        ref={viewFullScreen}
        className={`w-[90%] md:w-[75%] mx-auto mt-5 z-100 ${
          showFullscreen
            ? "bg-white overflow-y-scroll overflow-x-hidden mt-30 mb-30"
            : ""
        }`}
      >
        {showFullscreen && (
          <RxCross2
            size={20}
            strokeWidth={2}
            className="text-black mt-5 mb-5 cursor-pointer"
            onClick={ExitFullScreen}
          />
        )}

        {hasSlidesTaken ? (
          <Congratulations
            course={{
              courseId: location.state?.id,
              courseName: location.state?.name,
            }}
          />
        ) : slides[currentSlide - 1]?.azure_url ? (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              slides[currentSlide - 1]?.azure_url
            )}`}
            width="100%"
            className="h-[52vh] overflow-x-hidden overflow-y-auto border border-zinc-400 rounded-md"
            allowFullScreen
            title="PPTX Viewer"
          ></iframe>
        ) : (
          <SlideViewer
            loading={quizLoading}
            content={SlideConfig(
              slides[currentSlide - 1]?.slide_layout,
              slides[currentSlide - 1]
            )}
          />
        )}

        {/* Carousel Progress and Buttons */}
        {!slides[currentSlide - 1]?.azure_url && (
          <CarouselButtons
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
            hasSlidesTaken={hasSlidesTaken}
            setHasSlidesTaken={setHasSlidesTaken}
            quizLoading={quizLoading}
            quizTaken={quizTaken}
            setQuizLoading={setQuizLoading}
            setQuizTaken={setQuizTaken}
            goToQuiz={(content, notes, mandatory) => {
              fetchQuiz(content, notes)
                .then((resp) => {
                  dispatch(setQuizes(resp));
                  dispatch(setMandatory(mandatory));
                  setShowQuiz(() => true);
                  setQuizLoading(() => false);
                })
                .catch(() => {
                  toast("Failed to load quiz");
                  setQuizLoading(() => false);
                });
            }}
          />
        )}
      </section>
      <section className="w-[90%] md:w-[75%] mx-auto mt-20 mb-20">
        <article className="grid md:grid-cols-4 gap-4 items-center">
          <h2
            className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
              activeTab === "Notes" ? "border-b-4 border-b-emerald-600" : ""
            }
             transition-all ease-in-out pb-5 text-xl`}
            onClick={() => setActiveTab("Notes")}
          >
            <RiBatterySaverFill
              size={35}
              className={` ${
                activeTab === "Notes"
                  ? "bg-emerald-600 text-white"
                  : "bg-[#C0E9D7] text-black"
              } rounded-full p-2 mr-3`}
            />
            Notes
          </h2>
          <h2
            className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
              activeTab === "Resources" ? "border-b-4 border-b-emerald-600" : ""
            }
             transition-all ease-in-out pb-5 text-xl`}
            onClick={() => setActiveTab("Resources")}
          >
            <GrResources
              size={35}
              className={`${
                activeTab === "Resources"
                  ? "bg-emerald-600 text-white border-b-emerald-600"
                  : "bg-[#C0E9D7] text-black"
              } rounded-full p-2 mr-3`}
            />
            Resources
          </h2>
          <h2
            className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
              activeTab === "Codi Tutor"
                ? "border-b-4 border-b-emerald-600"
                : ""
            }
             transition-all ease-in-out pb-5 text-xl`}
            onClick={() => setActiveTab("Codi Tutor")}
          >
            <MdOutlineMicNone
              size={35}
              className={`${
                activeTab === "Codi Tutor"
                  ? "bg-emerald-600 text-white border-b-emerald-600"
                  : "bg-[#C0E9D7] text-black"
              } rounded-full p-2 mr-3`}
            />
            Codi Tutor
          </h2>
          <h2
            className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
              activeTab === "Chat with AI"
                ? "border-b-4 border-b-emerald-600"
                : ""
            }
             transition-all ease-in-out pb-5 text-xl`}
            onClick={() => setActiveTab("Chat with AI")}
          >
            <BsChatDots
              size={35}
              className={`${
                activeTab === "Chat with AI"
                  ? "bg-emerald-600 text-white border-b-emerald-600"
                  : "bg-[#C0E9D7] text-black"
              } rounded-full p-2 mr-3`}
            />
            Chat with AI
          </h2>
        </article>
        {activeTab ? (
          <section className="border-1 border-zinc-600 rounded-xs p-2 h-[300px]">
            {activeTab === "Notes" && (
              <Notes notes={slides[currentSlide - 1].notes} />
            )}
            {activeTab === "Resources" && (
              <ResourceTab resources={slides[currentSlide - 1].resources} />
            )}
          </section>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
