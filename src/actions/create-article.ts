"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type createArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const createArticle = async (
  prevState: createArticleFormState,
  formData: FormData,
): Promise<createArticleFormState> => {

  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {userId} = await auth()

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
        clerkUserId: userId
    }
  })

  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before creating an article."],
      },
    };
  }
  
};
