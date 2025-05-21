/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useCallback } from "react";
import { handleMic } from "./handle-fn/handleMic";
import BotBody from "./botbody";
import { handleStart } from "./handle-fn/handleStart";
import { handleStop } from "./handle-fn/handleStop";
import { useSelector } from "react-redux";

export default function TalkWithBot(props) {
  const { courseId, setStartConversation, currId, webEnable, ragEnable } =
    props;

  // selectors
  const config = useSelector((state) => state.tutor);
  console.log(config);

  const url = "https://ai.cta.uat.api.codibot.ai/api/v1.5.0";

  const englishWelcomeText =
    "Hi, welcome to the course! I hope you have an amazing learning experience! Do you have any questions?";
  const urduWelcomeText =
    "ہیلو، کورس میں خوش آمدید! مجھے امید ہے کہ آپ کو سیکھنے کا ایک حیرت انگیز تجربہ ہوگا! کیا آپ کا کوئی سوال ہے؟";
  const frenchWelcomeText =
    "Hei, tervetuloa kurssille! Toivon, että sinulla on hämmästyttävä oppimiskokemus! Onko sinulla kysyttävää?";
  const arabicWelcomeText =
    "مرحبا، مرحبا بكم في الدورة! أتمنى أن يكون لديك تجربة تعليمية مذهلة! هل لديك أي أسئلة؟";

  const text =
    config.default.language === "English"
      ? englishWelcomeText
      : config.default.language === "Urdu"
      ? urduWelcomeText
      : config.default.language === "Arabic"
      ? arabicWelcomeText
      : config.default.language === "Finish"
      ? frenchWelcomeText
      : englishWelcomeText;

  const checkDevice =
    /iphone|ipad|android|mobile|blackberry|phone|macintosh|mac os/.test(
      navigator.userAgent.toLowerCase()
    );

  // <-- start state variables -->
  const [mode, setMode] = useState("idle");
  const [mic, setMic] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);

  // <-- end state variables -->

  // <-- start refs -->

  // :  audio element
  const audio = useRef(null);
  const audioData = useRef([]);
  const audioSpeaking = useRef(false);
  const playChunks = useRef([]);

  // : audio refs
  const mediaStream = useRef(null);
  const recorder = useRef(null);
  const context = useRef(null);
  const streamNode = useRef(null);
  const analyserNode = useRef(null);

  // : volume refs
  const index = useRef(0);
  const speaking = useRef(false);

  // : interval refs
  const interval = useRef(null);

  // : request refs
  const controller = useRef(null);

  // <-- end refs -->

  // <-- Request Payload Start -->
  const payload = {
    text_to_speech_conversion: false,
    enable_RAG: ragEnable,
    enable_internet_search: false,
    transcription_prompt: "",
    text: "",
    speaker_voice: config.speaker,
    max_first_sentence_length: 150,
    language: config.default.language,
    course_id: courseId,
    user_id: currId,
  };

  const ttsPayload = {
    text: text,
    voice: config.speaker,
    max_first_sentence_length: 150,
    remove_bullets: false,
    remove_newlines: false,
  };
  // <-- Request Payload End -->

  // <-- Play Stream Function -->

  const handleAudio = useCallback((stream) => {
    (async () => {
      const decodedStream = stream.pipeThrough(new TextDecoderStream());
      const reader = decodedStream.getReader();
      let partial = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        partial += value;

        const parts = partial.split("\n\n");
        partial = parts.pop();

        for (const part of parts) {
          const lines = part.split("\n");
          const event = {};
          for (const line of lines) {
            const [key, ...rest] = line.split(": ");
            if (key && rest.length) {
              event[key] = rest.join(": ");
            }
          }

          if (event.event === "message" || event.data) {
            let result = "";
            if (event.data === "[DONE]") {
              result = true;
            } else {
              result = "data:audio/mp4;base64," + event.data;
            }
            setMode(() => "speaking");
            playChunks.current.push(result);
            playChunk();
          }
        }
      }
    })();
  }, []);

  const playChunk = useCallback(() => {
    // Don't run the function when audio is speaking and don't run when there are no chunks to play
    if (audioSpeaking.current) return;
    if (playChunks.current.length === 0) return;
    audioSpeaking.current = true;

    audio.current.src = playChunks.current.shift();

    audio.current.addEventListener(
      "loadedmetadata",
      async () => {
        try {
          await audio.current.play();
        } catch (err) {
          console.log(err);
        }
      },
      { once: true }
    );
    audio.current.addEventListener(
      "ended",
      () => {
        if (playChunks.current[0] === true) {
          if (checkDevice) {
            setMode(() => "idle");
            setMic(() => false);
          } else {
            setMode(() => "listening");
            setMic(() => true);
          }
          playChunks.current.shift();
          audioSpeaking.current = false;
          setStream(() => null);
          return;
        }

        audioSpeaking.current = false;
        playChunk();
      },
      { once: true }
    );
  }, []);

  // <-- End Playstream functions -->

  //  <-- All UseEffects -->

  // : Behavior when unmount useEffect
  useEffect(() => {
    const welcomeUrl = `${url}/tts/stream`;
    fetch(welcomeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
        "agent-id": "cta_tzeiooykja6hg0b0",
      },
      body: JSON.stringify(ttsPayload),
    })
      .then((resp) => {
        setWelcome(true);
        setStream(resp.body);
      })
      .catch((err) => console.log(err));
  }, []);

  // : Behavior when start and stop recorder
  useEffect(() => {
    if (!welcome) return;

    if (mic && mode === "listening") {
      if (!checkDevice) {
        handleStart(
          mediaStream,
          recorder,
          context,
          streamNode,
          analyserNode,
          setRecording,
          interval,
          index,
          speaking,
          setMode,
          setMic
        );
      }
    }

    if (!mic && (mode === "thinking" || mode === "idle")) {
      if (recording) {
        handleStop(
          mediaStream,
          recorder,
          context,
          streamNode,
          analyserNode,
          setRecording,
          interval,
          index,
          speaking,
          mode,
          audioData,
          { url: url, payload: payload },
          setStream,
          controller
        );
      }
    }
  }, [welcome, mic, mode]);

  useEffect(() => {
    if (stream) {
      handleAudio(stream);
    }
  }, [stream]);

  // : End Recorder for component unmounted
  useEffect(() => {
    return () => {
      if (recording) {
        handleStop(
          mediaStream,
          recorder,
          context,
          streamNode,
          analyserNode,
          setRecording,
          interval,
          index,
          speaking,
          mode,
          audioData,
          { url: url, payload: payload },
          setStream,
          controller
        );
      }
    };
  }, []);
  // <-- End UseEffects -->

  return (
    <article className="sm:h-[30rem] h-[calc(100vh-23vh)] text-white flex flex-col justify-center items-center">
      <BotBody
        mode={mode}
        mic={mic}
        setShowIntro={setStartConversation}
        handleMic={() => {
          handleMic(
            audio,
            mode,
            setMic,
            setMode,
            audioSpeaking,
            playChunks,
            audioData,
            controller,
            { stream: stream, setStream: setStream }
          );
          if (mode !== "listening") {
            if (checkDevice) {
              handleStart(
                mediaStream,
                recorder,
                context,
                streamNode,
                analyserNode,
                setRecording,
                interval,
                index,
                speaking,
                setMode,
                setMic
              );
            }
          }
        }}
      />
      <audio ref={audio} style={{ opacity: "0", maxHeight: "0px" }}></audio>
    </article>
  );
}
