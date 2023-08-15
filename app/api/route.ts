import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": "process.env.DATA_API_KEY",
    },
  });
  const product = await res.json();

  return NextResponse.json({ product });
}

export async function POST(req: Request) {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': 'process.env.DATA_API_KEY',
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });

  // const data = await res.json();
  const { messages } = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  console.log(completion.data.choices[0].message);
  const response = completion.data.choices[0].message;
  // return response;

  return NextResponse.json(response);
}
