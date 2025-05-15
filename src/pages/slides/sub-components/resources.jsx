import { useEffect, useState } from "react";
import { Input } from "@/components/custom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setResources } from "@/pages/redux/resources-slice";
import ResourceInfo from "@/components/custom/ResourceInfo";
import { RxCross2 } from "react-icons/rx";

export default function Resources({ courseId, token, onClose }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const resources = useSelector((state) => state.resources.resources);
  const [resourceSelected, setResourceSelected] = useState(false);
  const [selectResource, setSelectResource] = useState({});

  useEffect(() => {
    const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/resource?resource_type=resources&course_id=${parseInt(
      courseId
    )}`;
    axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        dispatch(setResources(resp.data.resources));
      })
      .catch((err) => console.log(err));
  }, []);

  const filterResources = resources.filter((resource) =>
    resource.file_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleResource = (type, src) => {
    if (resourceSelected) {
      switch (type) {
        case "image":
          return <img src={src} alt="An Image" />;
        case "video":
          return (
            <video src={src} alt="A Video" controls={true} autoPlay={true} />
          );
        default:
          return null;
      }
    }

    const correctedType = type.includes("image/")
      ? "image"
      : type.includes("video/")
      ? "video"
      : type.includes("application/") || type.includes("text/")
      ? "file"
      : "";
    return correctedType;
  };

  function ShowFile(src) {
    const link = document.createElement("a");
    link.href = src;
    link.target = "_blank";
    return link.click();
  }

  return (
    <section className="h-[100%] w-[100%] fixed top-0 left-0 bg-gray-300 z-100 overflow-x-hidden overflow-y-scroll">
      <article
        className={`w-[90%] mx-auto ${
          resourceSelected ? "mt-10 mb-10" : "mt-20 mb-20 2xl:w-[70%]"
        }`}
      >
        {resourceSelected && selectResource.type !== "file" ? (
          <>
            <div className="flex flex-row justify-between items-start">
              <p className="text-black font-bold text-xl break-words">
                {selectResource.name}
              </p>
              <RxCross2
                size={25}
                strokeWidth={2}
                className="text-black cursor-pointer"
                onClick={() => {
                  setResourceSelected(() => false);
                  setSelectResource(() => {});
                }}
              />
            </div>
            <div className="mt-30 mb-30 flex justify-center items-center">
              {handleResource(selectResource.type, selectResource.src)}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <IoMdArrowRoundBack
                  size={30}
                  className="hover:text-zinc-400 cursor-pointer transition ease-in-out"
                  onClick={() => onClose(false)}
                />
                <h2 className="text-black font-bold text-3xl">Resources</h2>
              </div>
              <Input
                type="search"
                className="w-[100%] rounded-md bg-white border-none py-2 px-3 outline-none"
                placeholder="Search..."
                parentWidth="w-[100%] md:w-[23%]"
                value={search}
                onChange={(value) => setSearch(value)}
              />
            </div>
            <article className="mt-10 mb-5">
              {resources.length === 0 ? (
                <p className="text-center text-zinc-500">
                  No attachments available
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filterResources.map((resource) => (
                    <ResourceInfo
                      key={resource.primary_key}
                      title={resource.file_name}
                      type={handleResource(resource.content_type)}
                      src={resource.azure_url}
                      onSelect={(type, name, src) => {
                        if (type === "file") {
                          return ShowFile(src);
                        }
                        setResourceSelected(() => true);
                        setSelectResource(() => ({
                          type: type,
                          src: src,
                          name: name,
                        }));
                      }}
                    />
                  ))}
                </div>
              )}
            </article>
          </>
        )}
      </article>
    </section>
  );
}
