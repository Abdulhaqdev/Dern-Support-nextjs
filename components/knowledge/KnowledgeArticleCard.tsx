import Link from "next/link"
import type { KnowledgeArticle } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { uz } from "date-fns/locale"
import { BookMarked, Eye } from "lucide-react"

interface KnowledgeArticleCardProps {
  article: KnowledgeArticle
}

export function KnowledgeArticleCard({ article }: KnowledgeArticleCardProps) {
  const updatedAt = new Date(article.updatedAt)
  const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true, locale: uz })

  // Extract a short excerpt from the content
  const excerpt =
    article.content
      .replace(/[#*_`]/g, "") // Remove markdown formatting characters
      .split("\n")
      .filter((line) => line.trim().length > 0) // Remove empty lines
      .slice(1, 3) // Get first couple of paragraphs after the title
      .join(" ")
      .substring(0, 150) + "..."

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <Badge className="mb-2" variant="outline">
            {article.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Eye className="h-3 w-3 mr-1" />
            {article.viewCount} ko'rishlar
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">
          <Link href={`/knowledge/${article.id}`} className="hover:underline">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <BookMarked className="h-3 w-3 mr-1" />
          {timeAgo} yangilangan
        </div>
        <div className="flex gap-1 flex-wrap">
          {article.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {article.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{article.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
