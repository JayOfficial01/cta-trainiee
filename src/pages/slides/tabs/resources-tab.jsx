import { GiClapperboard } from "react-icons/gi";
import { BsFiletypePng } from "react-icons/bs";
import { MdOutlineRemoveRedEye, MdOutlinePlayCircle } from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Modal } from "@/components/custom";
import { RxCross2 } from "react-icons/rx";

export default function ResourceTab({ resources }) {
  const [selected, setSelected] = useState(false);
  const [selectedResource, setSelectedResource] = useState({});

  const renderType = (type, name, url) => {
    const correctedType = type.includes("image/")
      ? "image"
      : type.includes("video/")
      ? "video"
      : type.includes("text/") || (type.includes("application/") && "file");

    return (
      <>
        <div className="flex justify-center items-center rounded-md w-[100px] md:w-[15%] py-6 bg-[#01A17A]">
          {correctedType === "image" ? (
            <BsFiletypePng size={43} className="text-white" />
          ) : correctedType === "video" ? (
            <GiClapperboard size={43} className="text-white" />
          ) : correctedType === "file" ? (
            <FiFileText size={43} className="text-white" />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-zinc-700 mt-2 mb-2 break-words text-sm md:text-lg">
            {name}
          </p>
          <span
            className="bg-slate-700 w-fit px-3 py-1  gap-2 rounded-md flex items-center text-white"
            onClick={() => SelectResource(correctedType, url, name)}
          >
            {correctedType != "video" ? "View" : "Play"}
            {correctedType === "image" ? (
              <MdOutlineRemoveRedEye />
            ) : correctedType === "video" ? (
              <MdOutlinePlayCircle />
            ) : correctedType === "file" ? (
              <MdOutlineRemoveRedEye />
            ) : (
              ""
            )}
          </span>
        </div>
      </>
    );
  };

  useEffect(() => {
    selected
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [selected]);

  function SelectResource(type, url, name) {
    if (type === "file") {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      return link.click();
    } else {
      setSelectedResource({ type: type, url: url, name: name });
      setSelected(true);
    }
  }

  return (
    <section className="border-1 border-zinc-600 rounded-md h-[400px] overflow-y-auto">
      <Modal
        state={selected && selectedResource.type != "file"}
        styles={`bg-[#D1D5DB]`}
      >
        <div className="w-[90%] mt-20 mx-auto flex items-end justify-end">
          <RxCross2
            size={20}
            strokeWidth={3}
            onClick={() => {
              setSelected(false);
              setSelectedResource({});
            }}
            className="text-black cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center w-[80%] mx-auto mt-20 mb-20">
          {selectedResource.type === "image" && (
            <img src={selectedResource.url} alt="Image" />
          )}
          {selectedResource.type === "video" && (
            <video src={selectedResource.url} controls={true} autoPlay={true} />
          )}
        </div>
      </Modal>
      <article className="p-2">
        {!resources ? (
          <p className="text-center text-zinc-500 text-lg p-3">
            No Resource available
          </p>
        ) : resources.length === 0 ? (
          <p className="text-center text-zinc-500 text-lg p-3">
            No Resource available
          </p>
        ) : (
          <div className="flex flex-col gap-6 mt-10 mb-10">
            {resources.map((resource, index) => (
              <div
                className="flex flex-row gap-5 hover:bg-zinc-100 w-[90%] mx-auto cursor-pointer transition ease-in-out"
                key={index + 1}
              >
                {renderType(
                  resource.resource_type,
                  resource.name,
                  resource.url
                )}
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
