import React from 'react'
import {Prisma} from "@/generated/client"

type articleDetailsProps = {
        article: Prisma.ArticleGetPayload<{
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        imageUrl: true
                    }
                }
            }
        }>
}

const ArticleDetailCard = ({article}: articleDetailsProps) => {
  return (
    <div>ArticleDetailCard</div>
  )
}

export default ArticleDetailCard