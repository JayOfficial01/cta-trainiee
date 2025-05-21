/* eslint-disable react/prop-types */
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BotBody({ mode, mic, setShowIntro, handleMic }) {
  return (
    <>
      <picture className="flex items-center justify-center w-80">
        {mode === "thinking" ? (
          <img
            src="./assets/gifs/thinking.gif"
            alt="ChatBot Thinking"
            className="w-full"
          />
        ) : (
          <img
            src="./assets/gifs/chatBotListen.gif"
            alt="ChatBot Listening"
            className="w-full"
          />
        )}
      </picture>

      <article className="flex flex-col justify-center items-center gap-3">
        {mode === "thinking" ? (
          <h1 className="text-2xl">Thinking...</h1>
        ) : mode === "listening" ? (
          <h1 className="text-2xl">Listening...</h1>
        ) : mode === "speaking" ? (
          <h1 className="text-2xl">Speaking...</h1>
        ) : (
          <h1 className="text-2xl">Idle Mode</h1>
        )}

        <article className="flex items-center gap-3 flex-col">
          <span
            className="border rounded-full border-white flex items-center justify-center w-12 h-12 p-2 cursor-pointer"
            onClick={handleMic}
          >
            {mic ? <Mic size={20} /> : <MicOff size={20} />}
          </span>
          <p className="text-xs mt-3">
            {mode === "speaking"
              ? "* To interrupt, click the mic button."
              : "* Click the mic button to speak."}
          </p>
          <Button
            className="bg-green-500 mt-3 cursor-pointer"
            onClick={() => {
              setShowIntro(() => false);
            }}
          >
            Stop Conversation
          </Button>
        </article>
      </article>
    </>
  );
}
