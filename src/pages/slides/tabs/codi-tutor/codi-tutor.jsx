import { useState } from "react";
import TalkWithBot from "./talkwithbot";
import { Button } from "@/components/custom";
import TalkSettings from "./talksettings";

export default function CodiTutor({ courseId, currId, webEnable, ragEnable }) {
  const [startConversation, setStartConversation] = useState(false);

  return (
    <section className="border-1 border-zinc-600 rounded-md">
      <section className="bg-[#04A87E] w-[95%] mt-5 mb-5 mx-auto h-[500px] relative">
        {startConversation ? (
          <TalkWithBot
            setStartConversation={setStartConversation}
            courseId={courseId}
            currId={currId}
            webEnable={webEnable}
            ragEnable={ragEnable}
          />
        ) : (
          <>
            <TalkSettings />
            <article className="flex-col gap-3 text-center w-full h-full text-white flex justify-center items-center">
              <img
                src="/assets/icons/chatBotIcon.png"
                className="w-[200px] h-auto"
                alt="Start Icon"
              />
              <h2 className="text-2xl">CodiTutor</h2>
              <p>your Personalized Teacher</p>
              <Button
                className="bg-emerald-500 rounded-md cursor-pointer p-3"
                onClick={() => setStartConversation(true)}
              >
                Start Conversation
              </Button>
            </article>
          </>
        )}
      </section>
    </section>
  );
}
