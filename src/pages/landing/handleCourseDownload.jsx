import axios from "axios";
export async function handleCourseDownload(
  courseId,
  token,
  courseName,
  setIsDownloading,
  target
) {
  try {
    setIsDownloading((prev) => [...prev, courseId]);
    const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/course/certificate?course_id=${courseId}`;
    const request = await axios.post(
      url,
      {},
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
    if (request.status != 200) {
      return { failure: "Failed to get resource" };
    }

    const resource = URL.createObjectURL(request.data);

    // Add and download resource
    target.href = resource;
    target.download = `${courseName}_certificate.pdf`;
    target.click();

    setTimeout(() => {
      URL.revokeObjectURL(resource);
    }, 1000);
    setIsDownloading((prev) => prev.filter((n) => n !== courseId));
  } catch (err) {
    console.log(err);
  }
}
