import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (keeping this as it was in the original file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Add schema for the Affirmation Generator app
export const GoalEnum = z.enum(["Focus", "Calm", "Energy"]);
export type Goal = z.infer<typeof GoalEnum>;

// Request schema for generating affirmations
export const GenerateRequestSchema = z.object({
  goal: GoalEnum,
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

// Response schema for affirmations
export const AffirmationResponseSchema = z.object({
  affirmations: z.array(z.string()).length(5),
});

export type AffirmationResponse = z.infer<typeof AffirmationResponseSchema>;
