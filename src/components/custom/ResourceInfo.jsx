import { FaFilePdf } from "react-icons/fa";
import { GiClapperboard } from "react-icons/gi";

export default function ResourceInfo({ type, src, title, onSelect }) {
  return (
    <div onClick={() => onSelect(type, title, src)}>
      <div className="bg-white p-2 rounded-md flex justify-center items-center h-[180px] cursor-pointer">
        {type === "image" && <img src={src} alt={title} className="h-[100%]" />}
        {type === "video" && (
          <div className="rounded-full bg-[#01A17A] p-3 text-white">
            <GiClapperboard size={40} />
          </div>
        )}
        {type === "file" && (
          <div className="rounded-full bg-[#01A17A] p-2 text-white">
            <FaFilePdf size={40} />
          </div>
        )}
      </div>
      <p className="font-medium text-black mt-3 break-words">{title}</p>
    </div>
  );
}
