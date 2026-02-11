"use server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { clientPromise } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import MapModel from "@/models/Map";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const makeMaps = async (prompt: string) => {
  const session: any = await getServerSession();
  if (!session) {
    redirect("/signup");
  }

  const geminiPrompt = `
Generate a hierarchical JSON structure to represent a mind map of the following topic:
"${prompt}"

Structure should have:
- "id": number(but stringified) representing the iterations
- "label": short concept label
- "children": array of similar nodes (can be empty or omitted)

Output ONLY the JSON is required no markdown or other explanation.
example Output:
{
  id: "1",
  label: "Central Topic",
  children: [
    {
      id: "2",
      label: "Branch A",
      children: [
        { id: "3", label: "Sub A1" },
        { id: "4", label: "Sub A2" },
      ],
    },
    {
      id: "5",
      label: "Branch B",
      children: [
        {
          id: "6",
          label: "kapa",
          children: [
            {
              id: "7",
              label: "kapa deep",
            },
            {
              id: "8",
              label: "keep deep same",
            },
          ],
        },
      ],
    },
  ],
};
`;

  try {
    if (!prompt) {
      throw new Error("Empty prompt not allowed");
    }

    await clientPromise();
    const user = await UserModel.findOne({ gmail: session.user.email });
    let credits: number = user.credits;

    credits = credits - 1;
    if (credits < 0) {
      throw new Error("Not enough credits!");
    }
    user.credits = credits;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

    const geminiModel = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: geminiPrompt }],
        },
      ],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 3000,
      },
    });

    const data = {
      candidates: [
        {
          content: {
            parts: [{ text: result.response.text() }],
          },
        },
      ],
    };

    const inp = data.candidates[0].content.parts[0].text;
    const match = inp
      .replace(/^\s*```json\s*/i, "")
      .replace(/\s*```[\s\n]*$/, "")
      .trim();

    const mapObject = {
      mapJson: JSON.parse(match),
      userGmail: "jparth582@gmail.com",
      prompt: prompt,
    };
    const newMap = new MapModel(mapObject);

    const h = await newMap.save().then(console.log("saved succesfully"));

    await user.save();
    return {
      prompt: h.prompt,
      mapJson: h.mapJson,
      _id: h._id.toString(),
      success: true,
    };
  } catch (error: any) {
    if (error instanceof TypeError) {
      return {
        error: "Internal Server Error!",
        success: false,
      };
    } else {
      console.log("Some other error:", error);
    }

    return { error: error.message, success: false };
  }
};
