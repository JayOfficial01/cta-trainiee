import { useNavigate } from "react-router";
import { Switch } from "@/components/custom";

export default function SlideMenu(props) {
  const navigate = useNavigate();
  const {
    setShowResources,
    setWebSearch,
    setDocSearch,
    docSearch,
    webSearch,
    onShow,
    courseId,
    courseName,
  } = props;
  return (
    <>
      <p
        className="text-sm sm:text-base hover:text-emerald-600"
        onClick={() => setShowResources(() => true)}
      >
        Resources
      </p>
      <div className="flex flex-row justify-between items-center gap-16 hover:text-emerald-600">
        <p>Web Search</p>
        <Switch
          onChange={() => {
            setWebSearch(true);
            docSearch ? setDocSearch(false) : "";
          }}
          open={webSearch}
        />
      </div>
      <div className="flex flex-row justify-between items-center gap-16 hover:text-emerald-600">
        <p>Doc Search</p>
        <Switch
          onChange={() => {
            webSearch ? setWebSearch(false) : "";
            setDocSearch(true);
          }}
          open={docSearch}
        />
      </div>
      <p className="hover:text-emerald-600" onClick={() => onShow()}>
        Full Screen
      </p>
      <p
        className="hover:text-emerald-600"
        onClick={() =>
          navigate("/assessment", {
            state: { id: courseId, name: courseName },
          })
        }
      >
        Assessment
      </p>
    </>
  );
}
