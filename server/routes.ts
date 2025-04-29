import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateAffirmationsWithOpenAI } from "./openai";
import { GenerateRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Affirmation generation endpoint
  app.post("/api/generate", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const { goal } = GenerateRequestSchema.parse(req.body);
      
      // Generate affirmations using OpenAI
      const affirmations = await generateAffirmationsWithOpenAI(goal);
      
      // Return the affirmations
      return res.json({ affirmations });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error generating affirmations:", error);
      return res.status(500).json({ 
        message: "Failed to generate affirmations. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
