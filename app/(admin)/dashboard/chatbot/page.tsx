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
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import chatCompletion from "./prompt";
export default function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [showBot, setShowBot] = useState(true);
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "How can I help you?",
      sentTime: "just now",
      sender: "GPT",
      direction: "incoming",
      position: "first",
    },
  ]);
  const handleShowBot = () => {
    setShowBot((show) => !show);
  };
  const handleSend = async (message: string) => {
    const newMessage: MessageModel = {
      type: "text",
      message: message,
      direction: "outgoing",
      sender: "user",
      position: "last",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageToGpt(newMessages);
  };
  async function processMessageToGpt(chatMessages: MessageModel[]) {
    let apiMessages = chatMessages.map((messageObj) => {
      let role;
      if (messageObj.sender === "GPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObj.message };
    });
    const systemMessage = {
      role: "system",
      content:
        "You are a chatbot that is supposed to guide users through their queries that is related to a project called ISearch that is a job recruitment site that uses AI. You will answer questions which will usually be about how to write a better cv/resume or a general.",
    };
    const apiRequestBody = {};
    console.log(apiMessages);
    const response = await chatCompletion(apiMessages);
    setMessages([
      ...chatMessages,
      {
        message: response?.content,
        sender: "GPT",
        direction: "incoming",
        position: "last",
      },
    ]);
    setTyping(false);
    console.log(response);
  }

  return (
    <>
      <div
        className="absolute top-3/4 right-16 cursor-pointer"
        onClick={handleShowBot}
      >
        <ChatBubbleLeftRightIcon className="w-10 h-10 text-blue-700 hover:fill-blue-700" />
      </div>

      {showBot && (
        <div
          className="relative w-96 h-[500px] transition-transform"
          // style={{ position: "relative", height: "500px" }}
        >
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
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      )}
    </>
  );
}
