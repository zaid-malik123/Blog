import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {z} from "zod";

const createCommentSchema = z.object({
    body: z.string().min(1)
})

type createFormState = {
    errors: {
        body?: string[],
        formErrors?: string[]
    }
}

export const createComment = async (articleId: string, prevState: createFormState,formData: FormData):Promise<createFormState> => {
    const result = createCommentSchema.safeParse({
        body:formData.get('body') as string
    });
    if(!result.success){
        return {
            errors: {
                body: result.error.flatten().fieldErrors.body
            }
        }
    }

    const {userId} = await auth();

    if(!userId) {
        return {
            errors: {
                formErrors: ["User Id not find"]
            }
        }
    }

    const existingUser = await prisma.article.findFirst({
        where: {
            
        }
    })
    
}