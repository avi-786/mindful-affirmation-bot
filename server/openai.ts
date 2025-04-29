import OpenAI from "openai";
import { Goal } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateAffirmationsWithOpenAI(goal: Goal): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using gpt-3.5-turbo as specified in the requirements
      messages: [
        {
          role: "system",
          content: `You are a positive, motivational affirmation creator. 
          Generate EXACTLY 5 short, uplifting, and empowering affirmations related to the goal: ${goal}.
          Each affirmation should be concise (under 15 words), positive, present-tense, and personally meaningful.
          Format the response as a JSON array containing exactly 5 string affirmations.`,
        },
        {
          role: "user",
          content: `Create 5 uplifting affirmations for the goal: ${goal}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    // Parse the response to get the array of affirmations
    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    const parsedContent = JSON.parse(content);
    
    // Extract affirmations from the response
    let affirmations: string[] = [];
    
    // Handle different possible response formats
    if (Array.isArray(parsedContent)) {
      affirmations = parsedContent;
    } else if (parsedContent.affirmations && Array.isArray(parsedContent.affirmations)) {
      affirmations = parsedContent.affirmations;
    } else {
      // Find any array property in the response
      for (const key in parsedContent) {
        if (Array.isArray(parsedContent[key])) {
          affirmations = parsedContent[key];
          break;
        }
      }
    }

    // Ensure we have exactly 5 affirmations
    if (affirmations.length !== 5) {
      throw new Error("Failed to generate exactly 5 affirmations");
    }

    return affirmations;
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to generate affirmations: ${error.message}`);
  }
}
