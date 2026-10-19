import { useState, type ReactNode } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import loadingSpinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";

 type ChatMessages = {
  id: string;
  message: ReactNode;
  sender: string;
  time: string | number;
}[];


type ChatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: {
    target: {
      value: string;
    }
  }) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const newChatMessage: ChatMessages = [
      //(...) Javascript spread operator, takes the value in an array and copies it to a new array
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages(newChatMessage);

    setInputText("");

    setChatMessages([
      ...newChatMessage,
      {
        message: (
          <img src={loadingSpinner} alt="loading" className="loading-message" />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      //(...) Javascript spread operator, takes the value in an array and copies it to a new array
      ...newChatMessage,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }

          if (event.key === "Escape") {
            setInputText("");
          }
        }}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}
