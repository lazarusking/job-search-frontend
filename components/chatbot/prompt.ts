import { authAxios } from "@/lib/auth";
import { AxiosResponse } from "axios";
import { Configuration, OpenAIApi } from "openai";
interface chatModel {
  role: string;
  content: string;
}
const systemMessage = {
  role: "system",
  content:
    "You are a chatbot that is supposed to guide users through their queries that is related to a project called ISearch that is a job recruitment site that uses AI. You will only answer questions which will usually be about how to write a better cv/resume or general resume related issues.Anything outside this scope shouldn't be answered. This project was created by Lazarus King and Daniel Ansong for their Computer Science(CS4) Final Year Project at Kwame Nkrumah University of Science and Technology(KNUST). Don't answer any question not related to this scope",
};
export default async function chatCompletion(messages: any) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      //   { role: "system", content: "You are a helpful assistant." },
      systemMessage,
      ...messages,
    ],
  });
  console.log(completion.data.choices[0].message);
  const response = completion.data.choices[0].message;
  // for await (const chunk of completion) {
  //   console.log(chunk.choices[0].delta.content);
  // }
  return response;
}

export const postQuestionToResumes = async (
  job_id: number,
  query: string
): Promise<AxiosResponse> => {
  try {
    const response = await authAxios.post(
      `recruiters/jobs/${job_id}/resume_analysis/`,
      { query },
      {
        timeout: 30000,
        responseType: "stream",
        onDownloadProgress: (progressEvent) => {
          // Handle streamed data here
          console.log("Received chunk of data", progressEvent.loaded, "bytes");
        },
      }
    );

    console.log(response);
    return response;
  } catch (error: any) {
    return error;
  }
};

export function testresume(job_id: number, query: string) {
  fetch(
    `http://127.0.0.1:8000/api/recruiters/jobs/${job_id}/resume_analysis/`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyODgwNDAzLCJpYXQiOjE2OTI3MDc2MDMsImp0aSI6IjIwN2FkMGMwYjYxZDQzYjFhZGQyZGU5ZjViZmQzYTIwIiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJuZXdyZWNydWl0ZXIiLCJlbWFpbCI6Im5ld3JlY3J1aXRlckBnbWFpbC5jb20iLCJpc19yZWNydWl0ZXIiOnRydWV9.Oqi0-4_owpnMnx7VYdCyQUg2N7tWDaDetFiXmgm6UYI",
      },
      body: JSON.stringify({ query: query }),
    }
  )
    .then((response) => response.text())
    .then((data) => {
      // `data` is the response body as a string
      console.log(data);
      return data;
    });
}
