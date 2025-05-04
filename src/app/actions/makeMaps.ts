"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { MapModel } from "../../../models/Map";
import { clientPromise } from "@/lib/dbConnect";
import UserModel from "../../../models/User";



export const makeMaps = async (prompt: string) => {

    

  const session:any = await getServerSession(authOptions);
  console.log(session);
  if(!session){
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
`;

  try {
    if(!prompt){
      throw new Error("Empty prompt not allowed");
    }


await clientPromise();
    const user = await UserModel.findOne({gmail:session.user.email});
  let credits:number = user.credits;
    

  credits= credits-1;
  if(credits<0){
    throw new Error("Not enough credits!");
      
    }
  user.credits = credits;
    
    const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: geminiPrompt }],
          },
        ],
      }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  
  
  const inp = data.candidates[0].content.parts[0].text;
  const match = inp
    .replace(/^\s*```json\s*/i, "")
    .replace(/\s*```[\s\n]*$/, "")
    .trim();

const mapObject = {
    mapJson:JSON.parse(match),
    userGmail:session.user.email,
    prompt:prompt


  }
    const newMap = new MapModel(mapObject)
  
  const h = await newMap.save().then(console.log("saved succesfully"));
  
  await user.save();
  
  

  
  return {prompt:h.prompt,mapJson:h.mapJson,_id:h._id.toString(),success:true};
 
  } catch (error:any) {

    console.log(error);

    return {error:error.message,success:false}

    
  }

  

  
};