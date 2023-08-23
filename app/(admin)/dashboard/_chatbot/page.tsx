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
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import chatCompletion from "./prompt";
const exampleMessages = [
  {
    heading: "Ask about an applicant",
    message: `Who is [applicant]?`,
  },
  {
    heading: "Explain technical concepts",
    message: "Does [applicant] know how to use Java? \n",
  },
  {
    heading: "Compare applicants",
    message: `Who amongst the applicants is a team-player and has good communication skills \n`,
  },
];
export default function Chatbot() {
  const [typing, setTyping] = useState(false);
  const [showBot, setShowBot] = useState(true);
  const [query, setQuery] = useState("");
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
                <Avatar
                  src={
                    "https://chatscope.io/storybook/react/static/media/lilly.62d4acff.svg"
                  }
                  name="Zoe"
                />
                <ConversationHeader.Content userName="Zoe" info="Active" />
                <ConversationHeader.Actions>
                  <InfoButton />
                </ConversationHeader.Actions>
              </ConversationHeader>
              <MessageList
                typingIndicator={
                  typing ? <TypingIndicator content={"Typing...."} /> : null
                }
              >
                <MessageList.Content>
                  <div className="mx-auto max-w-2xl p-3">
                    <div className="rounded-lg border bg-background p-8">
                      <h1 className="mb-2 text-lg font-bold">
                        Welcome to ISearch AI Chatbot!
                      </h1>

                      <p className="leading-normal text-gray-500">
                        You can start a conversation here or try the following
                        examples:
                      </p>
                      <div className="mt-4 flex flex-col items-start space-y-2">
                        {exampleMessages.map((message, index) => (
                          <button
                            key={index}
                            className="h-auto p-0 inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline"
                            onClick={() => setQuery(message.message)}
                          >
                            <ArrowRightIcon className="mr-2 w-4 h-4" />
                            {message.heading}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {messages.map((message, index) => {
                    return <Message key={index} model={message} />;
                  })}
                </MessageList.Content>
                {/* <Message model={messages} /> */}
              </MessageList>
              <MessageInput
                attachButton={false}
                value={query}
                onChange={(e) => setQuery(e)}
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
