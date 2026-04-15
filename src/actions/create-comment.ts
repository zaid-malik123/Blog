"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createCommentSchema = z.object({
  body: z.string().min(1),
});

type createFormState = {
  errors: {
    body?: string[];
    formErrors?: string[];
  };
};

export const createComment = async (
  articleId: string,
  prevState: createFormState,
  formData: FormData,
): Promise<createFormState> => {
  const result = createCommentSchema.safeParse({
    body: formData.get("body") as string,
  });
  if (!result.success) {
    return {
      errors: {
        body: result.error.flatten().fieldErrors.body,
      },
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["User Id not find"],
      },
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      clerkUserId: userId,
    },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: ["User not found. Please register before adding comment."],
      },
    };
  }

  try {
    await prisma.comment.create({
        data: {
            body: result.data.body,
            authorId: existingUser.id,
            articleId: articleId
        }
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error while creating comment"],
        },
      };
    }
  }

  revalidatePath(`/article/${articleId}`);
  return { errors: {} };
};
