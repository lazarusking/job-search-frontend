"use client";
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { postQuestionToResumes } from "./prompt";
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
export default function Chatbot({ job_slug }: { job_slug: number }) {
  const [typing, setTyping] = useState(false);
  const [showBot, setShowBot] = useState(false);
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
      position: "normal",
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    try {
      const response = await postQuestionToResumes(job_slug, message);
      console.log(response);
      if (response.status === 200) {
        setMessages([
          ...newMessages,
          {
            message: response.data,
            sender: "GPT",
            direction: "incoming",
            position: "last",
          },
        ]);
      } else {
        setMessages(newMessages.splice(-1, 1));
      }
    } catch (error) {
      console.log(error);
      console.log("Hello");
      setMessages(newMessages.splice(-1, 1));
    }
    setTyping(false);
    setQuery("");
    // await processMessageToGpt(newMessages);
  };

  return (
    <>
      <div className="fixed bottom-5 right-2 sm:right-16">
        <ChatBubbleLeftRightIcon
          onClick={handleShowBot}
          className="w-10 h-10 text-blue-700 cursor-pointer hover:fill-blue-700"
        />
        {showBot && (
          <aside
            className="absolute w-[90vw] h-[70vh] right-0 bottom-9 md:w-96 md:h-[500px] transition-transform"
            // style={{ position: "relative", height: "500px" }}
          >
            <MainContainer>
              <ChatContainer>
                <ConversationHeader>
                  <Avatar
                    src={
                      "https://chatscope.io/storybook/react/static/media/lilly.62d4acff.svg"
                    }
                    name="Resume Bot"
                  />
                  <ConversationHeader.Content userName="Zoe" info="Active" />
                  <ConversationHeader.Actions>
                    <XMarkIcon
                      onClick={() => setShowBot(false)}
                      className="w-7 h-7 text-blue-700"
                    />
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
                              className="h-auto p-0 inline-flex items-center text-left justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline"
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
                  onPaste={(evt) => {
                    evt.preventDefault();
                    setQuery(evt.clipboardData.getData("text"));
                  }}
                />
              </ChatContainer>
            </MainContainer>
          </aside>
        )}
      </div>
    </>
  );
}
