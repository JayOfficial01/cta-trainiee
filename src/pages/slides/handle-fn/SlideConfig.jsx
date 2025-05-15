const extractUrl = (htmlString) => {
  const parts = htmlString.split("src='");

  if (parts.length > 1) {
    return parts[1].split("'")[0];
  }
  return "";
};

export function SlideConfig(layout, slide) {
  switch (layout) {
    case "title_slide":
      return (
        <div
          className="h-full flex items-center justify-center"
          dangerouslySetInnerHTML={{
            __html: slide?.slide_title,
          }}
        />
      );
    case "content_slide":
      return (
        <div className="p-10">
          <div
            dangerouslySetInnerHTML={{
              __html: slide?.slide_title,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: slide?.slide_content,
            }}
          />
        </div>
      );
    case "two_content_slide":
      return (
        <div className="flex flex-col  lg:flex-row flex-wrap gap-5 p-10">
          <div
            className="w-[100%] lg:w-[45%]"
            dangerouslySetInnerHTML={{
              __html: slide?.slide_content,
            }}
          />
          <img
            src={extractUrl(slide?.media_content)}
            className="block w-[100%] lg:w-[45%]"
            alt="Slide Image"
          />
        </div>
      );
    default:
      return null;
  }
}
