import axios from "axios";
export async function SendEventAPI(
  startTime,
  currUser,
  courseId,
  courseName,
  meta
) {
  const endDate = Date.now();
  const timeSpent = (endDate - startTime) / 1000;

  const payload = {
    event_id: JSON.stringify(Date.now()),
    student_id: currUser.id,
    student_level: currUser.education,
    course_id: JSON.stringify(courseId),
    course_title: courseName,
    event_type: "screen_saver",
    timestamp: new Date(Date.now()).toISOString(),
    session_id: JSON.stringify(Date.now()),
    interaction_type: "inactive",
    metadata: meta,
    data: {
      context: "idle_time",
      details: {
        start_time: startTime,
        end_time: endDate,
        duration_mins: Math.round(timeSpent / 60),
      },
    },
  };
  const url = "https://reporting.cta.uat.api.codibot.ai/api/v1/analytics/event";
  axios
    .post(url, payload, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${currUser.token}`,
      },
    })
    .catch((err) => console.log(err));
}
