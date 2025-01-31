import { Stack } from "@mui/material";
import { useEffect, useRef, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import InitialChat from "../components/InitialChat";
import ChatInput from "../components/ChatInput";
import ChattingCard from "../components/ChattingCard";
import FeedbackModal from "../components/FeedbackModal";
import Navbar from "../components/NavBar";
import { ThemeContext } from "../theme/ThemeContext";
import data from "../data/data.json";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const listRef = useRef(null);
  const [chatId, setChatId] = useState(1);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [scrollToBottom, setScrollToBottom] = useState(false);
  const { chat, setChat } = useOutletContext();
  const { mode } = useContext(ThemeContext);

  // Generate AI response
  const generateResponse = (input) => {
    const response = data.find(
      (item) => input.toLowerCase() === item.question.toLowerCase()
    );
    const answer = response
      ? response.response
      : "Sorry, I didn't understand your query!";

    setChat((prev) => [
      ...prev,
      { type: "Human", text: input, time: new Date(), id: chatId },
      { type: "AI", text: answer, time: new Date(), id: chatId + 1 },
    ]);

    setChatId((prev) => prev + 2);
  };

  // Auto-scroll to the last element
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [scrollToBottom]);

  return (
    <Stack
      height="100vh"
      justifyContent="space-between"
      sx={{
        background:
          mode === "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
      }}
    >
      <Navbar />

      {chat.length === 0 && <InitialChat generateResponse={generateResponse} />}

      {chat.length > 0 && (
        <Stack
          height={1}
          flexGrow={0}
          p={{ xs: 2, md: 3 }}
          spacing={{ xs: 2, md: 3 }}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: "10px" },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(151, 133, 186,0.4)",
              borderRadius: "8px",
            },
          }}
          ref={listRef}
        >
          {chat.map((item) => (
            <ChattingCard
              details={item}
              key={item.id} // Use chat ID as the key
              updateChat={setChat}
              setSelectedChatId={setSelectedChatId}
              showFeedbackModal={() => setShowModal(true)}
            />
          ))}
        </Stack>
      )}

      <ChatInput
        generateResponse={generateResponse}
        setScroll={setScrollToBottom}
        chat={chat}
        clearChat={() => setChat([])}
      />

      <FeedbackModal
        open={showModal}
        updateChat={setChat}
        chatId={selectedChatId}
        handleClose={() => setShowModal(false)}
      />
    </Stack>
  );
}
