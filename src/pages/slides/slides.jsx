import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSlides, clearSlides } from "../redux/slides-slice";
import Loader from "../loader/Loader";
import "@lottiefiles/lottie-player";
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
import { BsChatDots } from "react-icons/bs";
import Notes from "./tabs/notes";
import ResourceTab from "./tabs/resources-tab";
import CodiTutor from "./tabs/codi-tutor/codi-tutor";
import { FaMicrophone } from "react-icons/fa";
import { SendEventAPI } from "./handle-fn/fnEventAPI";
import Chat from "./tabs/chat/chat";

export default function Slides({ currUser }) {
  const location = useLocation();
  if (!location.state?.id || !location.state?.name) return <Navigate to="/" />;

  const slides = useSelector((state) => state.slides.slides);
  const meta = useSelector((state) => state.meta);
  const dispatch = useDispatch();

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

  const currentTime = Date.now();
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

  // useEffect(() => {
  //   let timeoutId = null;
  //   let lastX = null;
  //   let lastY = null;
  //   let currentTime = null;
  //   let hasRequestSent = false;
  //   let wasIdle = false;

  //   const setIdleTimer = () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       setScreenSaver(true);
  //       wasIdle = true;

  //       if (!hasRequestSent) {
  //         hasRequestSent = true;
  //         SendEventAPI(
  //           currentTime,
  //           currUser,
  //           location.state.id,
  //           location.state.name,
  //           meta
  //         );
  //       }
  //     }, 12000);
  //   };

  //   const handleMouseMove = (e) => {
  //     const { clientX, clientY } = e;

  //     if (clientX !== lastX || clientY !== lastY) {
  //       lastX = clientX;
  //       lastY = clientY;

  //       if (wasIdle) {
  //         setScreenSaver(false);
  //         currentTime = Date.now();
  //         wasIdle = false;
  //         hasRequestSent = false;
  //       }

  //       setIdleTimer();
  //     }
  //   };

  //   const handleBlur = () => {
  //     setScreenSaver(true);
  //     currentTime = Date.now();
  //     wasIdle = true;

  //     if (!hasRequestSent) {
  //       hasRequestSent = true;
  //       SendEventAPI(
  //         currentTime,
  //         currUser,
  //         location.state.id,
  //         location.state.name,
  //         meta
  //       );
  //     }
  //   };

  //   const handleFocus = () => {
  //     if (wasIdle) {
  //       setScreenSaver(false);
  //       wasIdle = false;
  //       hasRequestSent = false;
  //     }
  //   };

  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("blur", handleBlur);
  //   window.addEventListener("focus", handleFocus);

  //   setIdleTimer();

  //   return () => {
  //     clearTimeout(timeoutId);
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("blur", handleBlur);
  //     window.removeEventListener("focus", handleFocus);
  //   };
  // }, [showQuiz]); // re-run effect if showQuiz state changes

  const startTimeRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    let hasFocus = true;
    let lastX = null;
    let lastY = null;
    let timer = null;

    function handleFocus() {
      hasFocus = true;
    }

    function handleBlur() {
      hasFocus = false;
      startTimeRef.current = Date.now();
      hasTriggeredRef.current = false;

      timer = setTimeout(() => {
        if (!hasFocus) {
          setScreenSaver(true);
        }
      }, 120000);
    }

    function handleMouse(e) {
      const { clientX, clientY } = e;

      if (clientX === lastX && clientY === lastY) return;
      lastX = clientX;
      lastY = clientY;

      clearTimeout(timer);

      timer = setTimeout(() => {
        setScreenSaver(true);
        hasFocus = false;
        startTimeRef.current = Date.now();
        hasTriggeredRef.current = false;
      }, 120000);

      if (screenSaver) {
        setScreenSaver(false);

        if (!hasTriggeredRef.current && startTimeRef.current) {
          SendEventAPI(
            startTimeRef.current,
            currUser,
            location.state.id,
            location.state.name,
            meta
          );
          hasTriggeredRef.current = true;
        }
      }
    }

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("mousemove", handleMouse);
      clearTimeout(timer);
    };
  }, [screenSaver]);

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

      {showQuiz && (
        <Quiz
          setShowQuiz={setShowQuiz}
          courseId={location.state.id}
          courseName={location.state.name}
          currentSlide={currentSlide}
        />
      )}

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
            currentSlide={currentSlide}
          />
        )}

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
                  setShowQuiz(true);
                  setQuizLoading(false);
                })
                .catch(() => {
                  toast("Failed to load quiz");
                  setQuizLoading(false);
                });
            }}
            SendEventRequest={() =>
              SendEventAPI(
                currentTime,
                currUser,
                location.state.id,
                location.state.name,
                meta
              )
            }
          />
        )}

        <section className="mt-20 mb-20">
          <article className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-center">
            {/* Tabs */}
            {[
              { label: "Notes", Icon: RiBatterySaverFill },
              { label: "Resources", Icon: GrResources },
              { label: "Codi Tutor", Icon: FaMicrophone },
              { label: "Chat with AI", Icon: BsChatDots },
            ].map(({ label, Icon }) => (
              <h2
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex justify-center items-center hover:border-b-4 hover:border-b-emerald-600 cursor-pointer ${
                  activeTab === label ? "border-b-4 border-b-emerald-600" : ""
                } transition-all ease-in-out pb-5 text-xl`}
              >
                <Icon
                  size={35}
                  className={`${
                    activeTab === label
                      ? "bg-emerald-600 text-white"
                      : "bg-[#C0E9D7] text-black"
                  } rounded-full p-2 mr-3`}
                />
                {label}
              </h2>
            ))}
          </article>

          {activeTab && (
            <>
              {activeTab === "Notes" && (
                <Notes notes={slides[currentSlide - 1].notes} />
              )}
              {activeTab === "Resources" && (
                <ResourceTab resources={slides[currentSlide - 1].resources} />
              )}
              {activeTab === "Codi Tutor" && (
                <CodiTutor
                  courseId={location.state.id}
                  currId={currUser.id}
                  webEnable={webSearch}
                  ragEnable={docSearch}
                />
              )}
              {activeTab === "Chat with AI" && (
                <Chat
                  currUser={currUser}
                  courseId={location.state.id}
                  webEnable={webSearch}
                  ragEnable={docSearch}
                />
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
}
