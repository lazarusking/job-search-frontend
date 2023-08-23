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
  //   delete configuration.baseOptions.headers['User-Agent'];

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
  return response;
}
