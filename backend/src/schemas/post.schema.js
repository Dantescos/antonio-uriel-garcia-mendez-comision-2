import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string({
    required_error: "titulo se requiere",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});
