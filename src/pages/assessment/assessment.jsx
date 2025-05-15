import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import Heading from "./heading";
import { useSelector, useDispatch } from "react-redux";
import { setQuestions, clearQuestions } from "../redux/questions-slice";
import Loader from "../loader/Loader";
import { Button, Question } from "@/components/custom";

export default function Assessment({ currUser }) {
  const location = useLocation();

  if (!location.state?.id || !location.state?.name) return <Navigate to="/" />;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Questions
  const questions = useSelector((state) => state.questions.value);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/course/assessment/${location.state?.id}`;
    axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      })
      .then((resp) => {
        const { list_of_assessments } = resp.data.data;
        dispatch(setQuestions(list_of_assessments));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChecked(assessment_id, answer) {
    setChecked((prev) => {
      const updated = prev.filter(
        (item) => item.assessment_id !== assessment_id
      );
      return [...updated, { assessment_id, answer }];
    });
  }

  function SubmitQuiz() {
    setLoading(true);
    const url =
      "https://course.cta.uat.api.codibot.ai/api/v1.5.0/student/evaluation";
    axios
      .post(
        url,
        {
          student_id: currUser.id,
          course_id: location.state?.id,
          evaluation_content: checked,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${currUser.token}`,
          },
        }
      )
      .then((resp) => {
        navigate("/successscore", {
          state: {
            percentage: resp.data.data.percentage,
            courseId: location.state?.id,
            courseName: location.state?.name,
          },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(clearQuestions());
        setLoading(false);
      });
  }

  return questions.length === 0 ? (
    <article className="col-span-full">
      <Loader />
    </article>
  ) : (
    <section>
      <Heading answered={checked.length} total={questions.length} />
      {questions.map((question, index) => {
        return (
          <Question
            key={question.assessment_id}
            id={question.assessment_id}
            question={question.question}
            options={question.options}
            checked={checked}
            onClick={(answer) => handleChecked(question.assessment_id, answer)}
            questionNo={`Question ${index + 1}: `}
          />
        );
      })}
      <div className="w-[95%] mx-auto justify-end items-end flex mt-5 mb-10">
        <Button
          disable={questions.length === checked.length ? false : true}
          className={
            questions.length === checked.length
              ? "bg-emerald-600 text-white w-fit py-2 px-4  rounded-md cursor-pointer"
              : "bg-zinc-500 text-white w-fit py-2 px-4 rounded-md cursor-not-allowed"
          }
          onClick={() => SubmitQuiz()}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </section>
  );
}
