import * as z from "zod";

export const PostValidation = z.object({
  posts: z.string().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

