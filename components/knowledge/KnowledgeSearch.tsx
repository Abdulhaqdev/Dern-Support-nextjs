"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { KnowledgeArticle } from "@/types"
import { KnowledgeArticleCard } from "./KnowledgeArticleCard"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KnowledgeSearchProps {
  articles: KnowledgeArticle[]
}

export function KnowledgeSearch({ articles }: KnowledgeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Extract all unique categories
  const categories = ["all", ...Array.from(new Set(articles.map((article) => article.category)))]

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Bilimlar bazasida qidirish..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Kategoriya" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "Barcha Kategoriyalar" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtr</span>
          </Button>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <KnowledgeArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed p-8 text-center">
          <h3 className="font-semibold">Hech qanday maqola topilmadi</h3>
          <p className="text-muted-foreground mt-1">Qidiruv so'zlari yoki filtrlaringizni o'zgartirib ko'ring.</p>
        </div>
      )}
    </div>
  )
}
