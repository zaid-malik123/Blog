import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function TopArticles() {

  const articles = await prisma.article.findMany({

    orderBy: {
      createdAt: "desc"
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true
        }
      }
    }

  })

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {articles.slice(0,3).map((article) => (
        <>
         <Card
        className={cn(
          "group relative overflow-hidden transition-all hover:scale-[1.02]",
          "border border-gray-200/50 dark:border-white/10",
          "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
        )}
      >
        <div className="p-6">
          <Link href={`/articles/${article.id}`}>
            
            {/* Image */}
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={article.featuredImage}
                alt="Article"
                fill
                className="object-cover"
              />
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Avatar className="h-8 w-8">
                <AvatarImage src={article.author.imageUrl!} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <span>{article.author.name}</span>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              {article.title}
            </h3>

            {/* Category */}
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {article.category}
            </p>

            {/* Meta */}
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{article.createdAt.toDateString()}</span>
              <span>12 min read</span>
            </div>

          </Link>
        </div>
      </Card>
        </>
      ))}
      
     

    </div>
  );
}