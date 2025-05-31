"use client"

import { useEffect, useState } from "react"
import { KnowledgeSearch } from "@/components/knowledge/KnowledgeSearch"
import { type KnowledgeArticle, convertApiKnowledgeToKnowledge } from "@/types"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiArticles = await apiClient.getKnowledgeArticles()
        const convertedArticles = apiArticles.map(convertApiKnowledgeToKnowledge)
        setArticles(convertedArticles)
      } catch (error) {
        console.error("Error fetching knowledge articles:", error)
        toast.error("Bilimlar bazasi maqolalarini yuklashda xatolik")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Bilimlar Bazasi</h1>
          <p className="text-muted-foreground">
            Umumiy savollarga javob toping va muammolarni qanday hal qilishni o'rganing
          </p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Bilimlar Bazasi</h1>
        <p className="text-muted-foreground">
          Umumiy savollarga javob toping va muammolarni qanday hal qilishni o'rganing
        </p>
      </div>

      <KnowledgeSearch articles={articles} />
    </div>
  )
}
