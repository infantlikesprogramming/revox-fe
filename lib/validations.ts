import { z } from "zod";

export const translationSchema = z.object({
  url: z.string().trim().url(),
  peopleIndexes: z.string().trim(),
  newPeople: z.string().trim(),
  topicIndex: z.string(),
  newTopic: z.string().trim(),
  topicImage: z.string().nonempty(),
  context: z.string().trim(),
  secretCode: z.string().trim().min(4).max(100),
});
