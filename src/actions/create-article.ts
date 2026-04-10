"use server";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { array, z } from "zod";

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

export const createArticles = async (
  prevState: createArticleFormState | undefined,
  formData: FormData,
) => {
  
  console.log("THIS IS THE FORM DATA " , formData)

  const result = createArticleSchema.safeParse({
  title: formData.get("title")?.toString(),
  category: formData.get("category")?.toString(),
  content: formData.get("content")?.toString(),
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

  const imageFile = formData.get("featuredImage") as File | null

  if (!imageFile || imageFile?.size === 0) {
    return {
      errors: {
        featuredImage: ["Image file is required."],
      },
    };
  }

  const arrBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrBuffer);


  const imageUrl = await uploadOnCloudinary(buffer)

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again."],
      },
    };
  }

  
  try {

    await prisma.article.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id, 
      },
    });

    console.log("UPLOAD ARTICLE SUCCESSFULLY ")
    
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
          formErrors: ["Some internal server error occurred."],
        },
      };
    }
  }
  
    revalidatePath("/dashboard");
    redirect("/dashboard");

  
};
