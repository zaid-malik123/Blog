import EditArticlePage from '@/components/articles/EditArticlePage'
import { prisma } from '@/lib/prisma';
import React from 'react'

const page = async ({params}: {params: {id: string}}) => {

  const id = await params;

  const article = await prisma.article.findUnique({
    where: {
      id: id.id
    }
  })


  return (
    <div>
        <EditArticlePage article={article} />
    </div>
  )
}

export default page