import { Input } from "@/components/custom";
import { setChat } from "@/pages/redux/chat-slice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chat({ currUser, courseId, webEnable, ragEnable }) {
  const chats = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // states
  const [text, setText] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  // Ref
  const isBottomRef = useRef(null);

  useEffect(() => {
    const url = `https://ai.cta.uat.api.codibot.ai/api/v1.5.0/ai/chat/history?course_id=${courseId}&user_id=${currUser.id}`;
    axios(url, {
      headers: {
        "agent-id": "cta_tzeiooykja6hg0b0",
        "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
      },
    })
      .then((resp) => {
        const messages = resp.data.data.map((item) =>
          item.user
            ? { text: item.user, isUser: true }
            : { text: item.agent, isUser: false }
        );
        dispatch(setChat(messages));
      })
      .catch((err) => console.log(err));
  }, []);

  function handlePostMessage() {
    if (!text) return;
    text.trim();

    setMessageLoading(true);
    const url =
      "https://ai.cta.uat.api.codibot.ai/api/v1.5.0/trainee/agent/stream";
    const params = {
      course_id: courseId,
      user_id: currUser.id,
      session_id: "cta_tzeiooykja6hg0b0_b2196d87-8939-4e38-b6c4-47f32ed21329",
      query: text,
      v2v: false,
      tools: {
        rag: ragEnable,
        web_search: webEnable,
      },
    };
    axios
      .post(url, params, {
        headers: {
          "x-api-key": "sk-cta-dhqzp3m0tgexub4rbe8mx5lc7gi0sll3",
          "agent-id": "cta_tzeiooykja6hg0b0",
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        dispatch(
          setChat([
            ...chats,
            { text: text, isUser: true },
            { text: resp.data.data.response, isUser: false },
          ])
        );
        setText("");
      })
      .catch((err) => console.log(err))
      .finally(() => setMessageLoading(false));
  }

  useEffect(() => {
    if (isBottomRef.current) {
      isBottomRef.current.scrollTo({
        top: isBottomRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  return (
    <section
      className="border-1 border-zinc-600 rounded-md h-[400px] overflow-y-auto"
      ref={isBottomRef}
    >
      <section className="bg-zinc-100 m-4">
        {chats.length === 0 ? (
          <p className="text-center mt-2 text-zinc-700 h-[400px]">
            Loading Messages...
          </p>
        ) : (
          <div className="flex flex-col gap-10 w-[95%] pt-10 mx-auto">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`mb-4 ${chat.isUser ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2  rounded-lg md:max-w-md max-w-xs  ${
                    chat.isUser
                      ? "bg-gradient-to-r from-[#007F5F] to-[#01B688] text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: chat.text }} />
                </div>
              </div>
            ))}
          </div>
        )}
        {messageLoading && (
          <div className="flex flex-col gap-3 w-[95%] mx-auto mb-5">
            <Skeleton className="h-[10px] w-[100px] animate-pulse bg-gray-400" />
            <Skeleton className="h-[10px] w-[80px] animate-pulse bg-gray-400" />
            <Skeleton className="h-[10px] w-[50px] animate-pulse bg-gray-400" />
          </div>
        )}
        {chats.length !== 0 && (
          <Input
            type="text"
            icon={<FaArrowRight />}
            onIconPress={handlePostMessage}
            value={text}
            onChange={(value) => setText(value)}
            onKeyPress={(e) => e.key === "Enter" && handlePostMessage()}
            iconStyles="bg-gradient-to-r from-[#007F5F] to-[#01B688] text-white p-3 rounded-md"
            className="w-full p-4 border-1 border-zinc-600 rounded-md outline-none"
            placeholder="Enter Your Query"
          />
        )}
      </section>
    </section>
  );
}
