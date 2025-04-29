import { apiRequest } from "@/lib/queryClient";
import { Goal, AffirmationResponseSchema } from "@shared/schema";

export async function generateAffirmations(goal: Goal) {
  const response = await apiRequest("POST", "/api/generate", { goal });
  const data = await response.json();
  
  // Validate response with zod schema
  const validatedData = AffirmationResponseSchema.parse(data);
  
  return validatedData;
}
