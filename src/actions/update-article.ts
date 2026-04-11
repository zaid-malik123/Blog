"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { uploadOnCloudinary } from "@/lib/cloudinary";

const updateArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type UpdateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const updateArticles = async (
  articleId: string,
  prevState: UpdateArticleFormState,
  formData: FormData,
): Promise<UpdateArticleFormState> => {
  const result = updateArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { userId } = await auth();
  if (!userId) {
    return {
      errors: { formErrors: ["You must be logged in to update an article."] },
    };
  }

  const existingArticle = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: { formErrors: ["Article not found."] },
    };
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user || existingArticle.authorId !== user.id) {
    return {
      errors: { formErrors: ["You are not authorized to edit this article."] },
    };
  }

  const imageFile = formData.get("featuredImage") as File | null;

  let image;

  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await uploadOnCloudinary(buffer);
    image = uploaded;
  }

  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: image as string,
      },
    });

  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Failed to update the article. Please try again."],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
