import ArticleDetailCard from '@/components/articles/ArticleDetailCard';
import { prisma } from '@/lib/prisma';

const ArticleDetailPage = async ({params}: {params: {id: string}}) => {

   const paramsId = await params;

   const article = await prisma.article.findFirst({
    where: {
        id: paramsId.id
    },
    include: {
        author: {
            select: {
                name: true,
                email: true,
                imageUrl: true
            }
        }
    }
   })

   if(!article) return <h1>Article Not Found !</h1>


    
  return (
    <div>
        <ArticleDetailCard article={article}/>
    </div>
  )
}

export default ArticleDetailPage