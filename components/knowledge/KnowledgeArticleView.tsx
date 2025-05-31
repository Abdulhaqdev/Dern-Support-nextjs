"use client"

import { useState } from "react"
import type { KnowledgeArticle } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { uz } from "date-fns/locale"
import { Eye, ThumbsUp, ThumbsDown, LinkIcon, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface KnowledgeArticleViewProps {
  article: KnowledgeArticle
}

export function KnowledgeArticleView({ article }: KnowledgeArticleViewProps) {
  const [helpfulVote, setHelpfulVote] = useState<boolean | null>(null)

  const updatedAt = new Date(article.updatedAt)
  const formattedDate = format(updatedAt, "d MMMM, yyyy", { locale: uz })

  const handleVote = (isHelpful: boolean) => {
    setHelpfulVote(isHelpful)

    // In a real app, you would send this to your API
    console.log(`Article ${article.id} rated as ${isHelpful ? "helpful" : "not helpful"}`)

    toast.success(`Fikringiz uchun rahmat!`)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Havola nusxalandi!")
  }

  const handlePrint = () => {
    window.print()
  }

  // Convert markdown-like content to HTML (simplified version)
  const formatContent = (content: string) => {
    // Replace markdown headers
    const withHeaders = content
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold my-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-md font-semibold my-2">$1</h4>')

    // Replace lists
    const withLists = withHeaders
      .replace(/^\d+\.\s+(.*$)/gm, '<li class="ml-6 list-decimal mb-1">$1</li>')
      .replace(/^\*\s+(.*$)/gm, '<li class="ml-6 list-disc mb-1">$1</li>')

    // Replace paragraphs (lines that aren't headers or list items)
    const withParagraphs = withLists.replace(/^(?!<h|<li)(.*$)/gm, (match) =>
      match.trim() ? `<p class="my-2">${match}</p>` : "",
    )

    // Replace bold, italic, and code
    const withFormatting = withParagraphs
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')

    return withFormatting
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/knowledge">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bilimlar bazasiga qaytish
          </Link>
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleCopyLink}>
            <LinkIcon className="mr-2 h-4 w-4" />
            Havolani nusxalash
          </Button>
          <Button variant="ghost" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Chop etish
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge>{article.category}</Badge>
          <div className="text-sm text-muted-foreground flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {article.viewCount} marta ko'rilgan
          </div>
        </div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-sm text-muted-foreground">Oxirgi marta {formattedDate} da yangilangan</p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          className="prose-headings:mt-6 prose-headings:mb-4"
        />
      </div>

      <div className="flex flex-wrap gap-2 py-4">
        {article.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">Bu maqola foydali bo'ldimi?</h3>
        <div className="flex items-center gap-4">
          <Button
            variant={helpfulVote === true ? "default" : "outline"}
            size="sm"
            onClick={() => handleVote(true)}
            disabled={helpfulVote !== null}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Ha
          </Button>
          <Button
            variant={helpfulVote === false ? "default" : "outline"}
            size="sm"
            onClick={() => handleVote(false)}
            disabled={helpfulVote !== null}
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            Yo'q
          </Button>
          {helpfulVote !== null && <p className="text-sm text-muted-foreground">Fikringiz uchun rahmat!</p>}
        </div>
      </div>

      <div className="bg-muted rounded-lg p-6 mt-8">
        <h3 className="font-semibold mb-2">Hali ham yordam kerakmi?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Agar izlagan javobingizni topa olmagan bo'lsangiz, bizning qo'llab-quvvatlash jamoamiz sizga yordam beradi.
        </p>
        <Button asChild>
          <Link href="/tickets/new">Qo'llab-quvvatlash so'rovi yaratish</Link>
        </Button>
      </div>
    </div>
  )
}
