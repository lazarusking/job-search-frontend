"use client";
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  InfoButton,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";

export default function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "How can I help you?",
      sentTime: "just now",
      sender: "GPT",
      direction: "incoming",
      position: "first",
    },
  ]);
  const handleBotClick = () => {
    setShowBot(true);
  };
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      direction: "outgoing",
      sender: "user",
    };
    const newMessages = [...messages, newMessage];
  };
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={
                "https://chatscope.io/storybook/react/static/media/lilly.62d4acff.svg"
              }
              name="Zoe"
            />
            <ConversationHeader.Content userName="Zoe" info="Active" />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={
              typing ? <TypingIndicator content={"Typing...."} /> : null
            }
          >
            {/* <Message model={messages} /> */}
            {messages.map((message, index) => {
              return <Message key={index} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
