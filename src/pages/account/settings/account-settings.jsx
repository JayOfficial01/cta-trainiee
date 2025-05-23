import Loader from "@/pages/loader/Loader";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/custom";
import { Button } from "@/components/custom";
import { fetchUserInformation } from "./fetchUserInformation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isUpdated } from "@/pages/redux/user-slice";

const educationLevels = [
  "Early childhood education",
  "Primary education",
  "Lower secondary education",
  "Upper secondary education",
  "Post-secondary non-tertiary education",
  "Short-cycle tertiary education",
  "Bachelor’s or equivalent",
  "Master’s or equivalent",
  "Doctoral or equivalent",
];

export default function AccountSetting({ currUser }) {
  const [bio, setBio] = useState({
    first_name: "",
    last_name: "",
    email: currUser.email,
    education_level: "",
    about: "",
    profile_pic: null,
  });
  const [loading, setLoading] = useState(true);
  const update = useSelector((state) => state.user.isUpdated);
  const dispatch = useDispatch();

  useEffect(() => {
    const url =
      "https://course.cta.uat.api.codibot.ai/api/v1.5.0/tenant/account/settings";
    fetchUserInformation(url, currUser.token, setBio, setLoading);
  }, [update]);

  // Image Ref
  const imageRef = useRef(null);

  function handleChange(key, value) {
    setBio({
      ...bio,
      [key]: value,
    });
  }

  function handleImageChange(e) {
    const blob = e.target.files[0];
    const url = URL.createObjectURL(blob);
    imageRef.current.src = url;
    setBio({ ...bio, profile_pic: url });
    if (blob) handleImageUpload(blob);
  }

  function handleImageUpload(file) {
    const formData = new FormData();
    formData.append("file", file);

    const url = `https://course.cta.uat.api.codibot.ai/api/v1.5.0/resource?resource_type=user&user_id=${currUser.id}`;
    axios
      .post(
        url,
        { files: file },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${currUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((resp) => {
        const picture = resp?.data?.uploaded_files[0]?.url;
        setBio({
          ...bio,
          profile_pic: picture,
        });
        dispatch(isUpdated());
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateData() {
    const url =
      "https://course.cta.uat.api.codibot.ai/api/v1.5.0/tenant/account/settings";
    axios
      .put(url, bio, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${currUser.token}`,
        },
      })
      .then(() => dispatch(isUpdated()))
      .catch((err) => console.log(err));
  }

  return loading ? (
    <article className="col-span-full">
      <Loader />
    </article>
  ) : (
    <article className="custom-container my-4">
      <h1 className="text-3xl font-bold text-primary">Account Information</h1>

      <form
        className="mt-10 w-[100%] xl:w-[30%]"
        onSubmit={async (e) => {
          e.preventDefault();
        }}
      >
        <article className="flex gap-4 mt-3 items-center">
          <article>
            <h3 className="text-sm">Profile Picture *</h3>
            <label htmlFor="profile_pic" className=" relative cursor-pointer">
              <input
                type="file"
                id="profile_pic"
                className="hidden"
                onChange={handleImageChange}
              />

              <picture className="flex items-center justify-center rounded-full w-24 h-24 mt-2 bg-slate-400 overflow-hidden">
                <img
                  ref={imageRef}
                  src={
                    bio.profile_pic !== null
                      ? bio.profile_pic
                      : "./assets/icons/chatBotIcon.png"
                  }
                  alt="Codifica icon"
                  className={` 
          ${bio.profile_pic !== null ? " object-cover h-[inherit]" : "w-full"}`}
                />
              </picture>
              <span className="absolute bottom-0 right-2 bg-primary text-white text-base w-5 h-5 flex items-center justify-center rounded-full">
                <Plus className="w-4" />
              </span>
            </label>
          </article>
        </article>

        <article className="mt-9 flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <Input
              type="text"
              label={{
                text: "First Name *",
                styles: true,
              }}
              value={bio.first_name}
              onChange={(value) => handleChange("first_name", value)}
              className="w-[90%] block border rounded-md p-2 border-zinc-500 outline-none bg-none"
            />
            <Input
              type="text"
              label={{
                text: "Last Name *",
                styles: true,
              }}
              value={bio.last_name}
              onChange={(value) => handleChange("last_name", value)}
              className="w-[90%] block border rounded-md p-2  border-zinc-500 outline-none bg-none"
            />
          </div>
          <Input
            type="email"
            value={bio.email}
            disable={true}
            className="w-[100%] border rounded-md p-2  border-zinc-500 outline-none bg-zinc-50"
            label={{ text: "Email*", styles: true }}
          />
          <div>
            <label className="text-black text-sm block mb-2">
              Level of Education
            </label>
            <select
              className="w-full p-2 border rounded-md border-zinc-500 outline-none"
              defaultValue={bio.education_level}
              onChange={(e) => handleChange("education_level", e.target.value)}
            >
              {educationLevels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-black text-sm block mb-2">About*</label>
            <textarea
              rows="3"
              value={bio.about}
              onChange={(e) => handleChange("about", e.target.value)}
              className="w-full p-2 border rounded-md border-zinc-500 outline-none"
            ></textarea>
          </div>
          <Button
            onClick={handleUpdateData}
            className="w-fit px-5 py-2 bg-[#007F5F] rounded-md text-white text-base cursor-pointer"
          >
            Submit
          </Button>
        </article>
      </form>
    </article>
  );
}
