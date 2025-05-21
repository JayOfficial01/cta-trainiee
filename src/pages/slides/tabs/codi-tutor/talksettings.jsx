import { Button, Select, Dropdown } from "@/components/custom";
import { useEffect, useMemo, useState, useCallback } from "react";
import { VscSettings } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setTutor, hasSpeaker } from "@/pages/redux/tutor-configuration-slice";
import axios from "axios";

export default function TalkSettings() {
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState([]);
  const [gender, setGender] = useState(["Female", "Male"]);
  const [voices, setVoices] = useState([]);
  const [configUpdate, setConfigUpdate] = useState(false);

  // Selectors
  const settings = useSelector((state) => state.tutor);

  // Selected Values
  const [selLanguage, setSelLanguage] = useState(
    settings.language || "English"
  );
  const [selGender, setSelGender] = useState(settings.gender || "Female");
  const [selCountry, setSelCountry] = useState(
    settings.country || ["United States"]
  );
  const [speaker, setSpeaker] = useState("");

  // url
  const url = "https://ai.cta.uat.api.codibot.ai/api/v1.5.0";

  // dispatch
  const dispatch = useDispatch();

  // memo
  const voiceParams = useMemo(
    () => ({
      language: selLanguage,
      country: selCountry,
      gender: selGender,
    }),
    [selCountry, selLanguage, selGender]
  );

  const fetchVoices = useCallback(() => {
    const query = new URLSearchParams(voiceParams).toString();
    const voiceUrl = `${url}/tts/voices?${query}`;
    axios(voiceUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
        "agent-id": "cta_tzeiooykja6hg0b0",
      },
    })
      .then((resp) => {
        setVoices(resp.data.voices);
        dispatch(
          setTutor({
            language: selLanguage,
            gender: selGender,
            country: selCountry,
          })
        );
        dispatch(hasSpeaker({ speaker: resp.data.voices[0]?.voice }));
      })
      .catch((err) => console.log(err));
  }, [selCountry, selLanguage, selGender]);

  const fetchLanguage = useCallback(() => {
    const languageUrl = `${url}/tts/languages`;
    axios(languageUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
        "agent-id": "cta_tzeiooykja6hg0b0",
      },
    })
      .then((resp) => {
        setLanguage(resp.data.languages);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchVoices();
  }, [configUpdate]);

  useEffect(() => {
    fetchLanguage();
  }, []);

  function handleChange(key, value) {
    key === "language"
      ? setSelLanguage(() => value)
      : key === "gender"
      ? setSelGender(() => value)
      : key === "speaker"
      ? setSpeaker(() => value)
      : "";

    if (key === "language") {
      value === "English"
        ? setSelCountry(() => ["United States"])
        : value === "Urdu"
        ? setSelCountry(() => ["Pakistan"])
        : value === "Arabic"
        ? setSelCountry(() => ["United Arab Emirates"])
        : setSelCountry(() => ["Finland"]);
    }
  }

  return (
    <Dropdown
      trigger={
        <article className="absolute top-5 right-5">
          <VscSettings size={25} className="text-white cursor-pointer" />
        </article>
      }
      bg="bg-white"
      position="top-4"
      styles="w-full h-fit py-5 px-3"
      state={{ state: menu, setState: setMenu }}
    >
      <section className="flex flex-col gap-6">
        <Select
          inDropdown={true}
          label={{ text: "Select Language", styles: "text-xs text-black" }}
          options={language.map((lang) => lang.language)}
          defaultValue={selLanguage}
          onChange={(value) => handleChange("language", value)}
        />
        <Select
          inDropdown={true}
          label={{ text: "Select Country", styles: "text-xs text-black" }}
          options={selCountry.map((country) => country)}
          onChange={(value) => console.log(value)}
        />
        <Select
          inDropdown={true}
          label={{ text: "Voice Selection Type", styles: "text-xs text-black" }}
          options={gender}
          onChange={(value) => handleChange("gender", value)}
        />
        <Select
          inDropdown={true}
          label={{ text: "Select Voice", styles: "text-xs text-black" }}
          options={voices.map((voice) => voice.speaker)}
          onChange={(value) => handleChange("speaker", value)}
        />
        <div className="flex gap-3 justify-center mb-20 text-center">
          <Button
            text="Save Changes"
            className="bg-[#22C55E] text-white py-2 px-5 cursor-pointer border-none rounded-md"
            onClick={() => {
              dispatch(
                setTutor({
                  language: selLanguage,
                  gender: selGender,
                  country: selCountry,
                })
              );
              dispatch(hasSpeaker({ speaker: speaker }));
              setConfigUpdate((prev) => !prev);
            }}
          />
          <Button
            text="Cancel"
            className="bg-zinc-500 text-white py-2 px-5 cursor-pointer border-none rounded-md"
            onClick={() => setMenu(false)}
          />
        </div>
      </section>
    </Dropdown>
  );
}
