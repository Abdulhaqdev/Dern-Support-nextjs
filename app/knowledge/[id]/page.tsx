"use client"

import { useEffect, useState } from "react"
import { KnowledgeArticleView } from "@/components/knowledge/KnowledgeArticleView"
import { type KnowledgeArticle, convertApiKnowledgeToKnowledge } from "@/types"
import { apiClient } from "@/lib/api"
import { toast } from "sonner"
import { notFound } from "next/navigation"

// Sample knowledge base data (same as in the main page)
const sampleKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: "1",
    title: "Kompyuter sekin ishlayotgan bo'lsa nima qilish kerak?",
    category: "Kompyuter Muammolari",
    content: `# Kompyuter sekin ishlayotgan bo'lsa nima qilish kerak?

Kompyuteringiz sekin ishlayotgan bo'lsa, quyidagi usullarni sinab ko'ring:

## 1. Kompyuterni qayta ishga tushiring
Eng oddiy va samarali usul - kompyuterni to'liq o'chirib, qayta yoqish.

## 2. Keraksiz dasturlarni yoping
* Task Manager (Ctrl+Shift+Esc) ni oching
* Processes bo'limida ko'p xotira ishlatayotgan dasturlarni toping
* Keraksiz dasturlarni End Task tugmasi orqali yoping

## 3. Diskni tozalash
* Disk Cleanup dasturini ishga tushiring
* Vaqtinchalik fayllarni o'chiring
* Recycle Bin ni tozalang

## 4. Antivirus tekshiruvi o'tkazing
Virus yoki zararli dasturlar kompyuterni sekinlashtirishi mumkin.

## 5. Yangilanishlarni o'rnating
Windows va drayverlardagi yangilanishlarni o'rnating.

Agar bu usullar yordam bermasa, texnik yordam uchun murojaat qiling.`,
    tags: ["kompyuter", "sekinlik", "tezlashtirish", "windows"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    viewCount: 245,
  },
  {
    id: "2",
    title: "Wi-Fi ga ulanish muammolari va yechimlari",
    category: "Tarmoq Muammolari",
    content: `# Wi-Fi ga ulanish muammolari va yechimlari

Wi-Fi ga ulanishda muammo bo'lsa, quyidagi qadamlarni bajaring:

## 1. Wi-Fi ni qayta yoqing
* Kompyuterda Wi-Fi ni o'chiring va qayta yoqing
* Yoki Airplane mode ni yoqib, keyin o'chiring

## 2. Routerni qayta ishga tushiring
* Router elektr kabelini 30 soniya uchun sug'uring
* Qayta ulang va 2-3 daqiqa kuting

## 3. Parolni tekshiring
* Wi-Fi parolini to'g'ri kiritganingizni tekshiring
* Katta va kichik harflarni e'tiborga oling

## 4. Tarmoq sozlamalarini tiklash
Windows da:
* Settings > Network & Internet > Status
* Network reset tugmasini bosing

## 5. Drayverni yangilash
* Device Manager ni oching
* Network adapters bo'limini kengaytiring
* Wi-Fi adapterga o'ng tugma bosib, "Update driver" ni tanlang

## 6. DNS ni o'zgartiring
* Google DNS: 8.8.8.8 va 8.8.4.4
* Cloudflare DNS: 1.1.1.1 va 1.0.0.1

Agar muammo davom etsa, ISP (internet provayder) bilan bog'laning.`,
    tags: ["wifi", "internet", "tarmoq", "ulanish"],
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
    viewCount: 189,
  },
  {
    id: "3",
    title: "Kompyuter o'zi o'chib qolsa nima qilish kerak?",
    category: "Kompyuter Muammolari",
    content: `# Kompyuter o'zi o'chib qolsa nima qilish kerak?

Kompyuter kutilmaganda o'chib qolishi turli sabablarga bog'liq bo'lishi mumkin:

## Asosiy sabablar:

### 1. Qizib ketish (Overheating)
* Kompyuter ichidagi changni tozalang
* Ventilyatorlar ishlayotganini tekshiring
* Havo oqimi yo'llarini to'sib qo'ymang

### 2. Elektr ta'minoti muammolari
* Elektr kabelini tekshiring
* UPS (Uninterruptible Power Supply) ishlatishni tavsiya qilamiz
* Elektr rozetkasini boshqasi bilan almashtiring

### 3. RAM (Xotira) muammolari
* RAM modullarini qayta o'rnating
* Windows Memory Diagnostic dasturini ishga tushiring

### 4. Qattiq disk muammolari
* CHKDSK buyrug'ini bajaring
* Disk xatolarini tekshiring

## Tezkor yechimlar:

1. **Xavfsiz rejimda ishga tushiring**
   * F8 tugmasini bosib, Safe Mode ni tanlang

2. **Tizim fayllarini tekshiring**
   * Command Prompt ni administrator sifatida oching
   * "sfc /scannow" buyrug'ini bajaring

3. **Haroratni kuzating**
   * HWMonitor yoki Core Temp dasturlarini ishlatib, haroratni tekshiring
   * CPU harorati 80°C dan oshmasligi kerak

Agar muammo davom etsa, texnik xizmatga murojaat qiling.`,
    tags: ["o'chish", "restart", "qizish", "elektr"],
    createdAt: "2024-01-12T11:30:00Z",
    updatedAt: "2024-01-22T13:20:00Z",
    viewCount: 156,
  },
  {
    id: "4",
    title: "Parolni unutgan bo'lsam qanday tiklash mumkin?",
    category: "Xavfsizlik",
    content: `# Parolni unutgan bo'lsam qanday tiklash mumkin?

Turli xil parollarni tiklash usullari:

## Windows parolini tiklash:

### 1. Microsoft hisobi orqali
* login.live.com saytiga kiring
* "Parolni unutdim" tugmasini bosing
* Telefon yoki email orqali tasdiqlang

### 2. Mahalliy hisob uchun
* Xavfsizlik savollariga javob bering
* Yoki Password Reset Disk ishlatib tiklang

## Email parolini tiklash:

### Gmail uchun:
* accounts.google.com/signin/recovery ga kiring
* Email manzilini kiriting
* Telefon yoki qo'shimcha email orqali tasdiqlang

### Outlook uchun:
* account.live.com/password/reset ga kiring
* Hisob ma'lumotlarini kiriting
* Tasdiqlash kodini oling

## Wi-Fi parolini topish:

### Windows da:
1. Control Panel > Network and Sharing Center
2. Wi-Fi nomiga bosing
3. Wireless Properties > Security
4. "Show characters" ni belgilang

### Router orqali:
1. 192.168.1.1 yoki 192.168.0.1 ga kiring
2. Admin login qiling (odatda admin/admin)
3. Wireless Settings bo'limini oching

## Xavfsizlik maslahatlari:

* **Kuchli parol yarating**: kamida 12 belgi, harflar, raqamlar va belgilar
* **Ikki bosqichli tasdiqlashni yoqing**
* **Parol menejerini ishlating**: LastPass, 1Password, Bitwarden
* **Parollarni qayta ishlatmang**

Agar hech qanday usul ishlamasa, texnik yordam so'rang.`,
    tags: ["parol", "tiklash", "xavfsizlik", "hisob"],
    createdAt: "2024-01-08T14:45:00Z",
    updatedAt: "2024-01-25T10:15:00Z",
    viewCount: 203,
  },
  {
    id: "5",
    title: "Printer bilan bog'lash va chop etish muammolari",
    category: "Printer Muammolari",
    content: `# Printer bilan bog'lash va chop etish muammolari

Printer bilan ishlashda uchraydigan muammolar va ularning yechimlari:

## Printer ulanmayotgan bo'lsa:

### 1. Ulanishni tekshiring
* USB kabelini qayta ulang
* Wi-Fi printer uchun tarmoq ulanishini tekshiring
* Printer yoniqligini tasdiqlang

### 2. Drayverni o'rnating
* Printer ishlab chiqaruvchisining rasmiy saytidan eng yangi drayverni yuklab oling
* Windows Update orqali avtomatik qidiring

### 3. Printer xizmatlarini qayta ishga tushiring
* Services.msc ni oching
* Print Spooler xizmatini toping
* Restart tugmasini bosing

## Chop etish sifati yomon bo'lsa:

### 1. Kartrijlarni tekshiring
* Siyoh yoki toner darajasini tekshiring
* Kartrijlarni tozalang
* Yangi kartrijlar o'rnating

### 2. Printer sozlamalarini tekshiring
* Print Quality ni "High" ga o'rnating
* To'g'ri qog'oz turini tanlang
* Color Management sozlamalarini tekshiring

### 3. Printer boshini tozalang
* Printer sozlamalarida "Clean Print Head" ni tanlang
* Yoki qo'lda tozalash uchun maxsus eritma ishlating

## Qog'oz tiqilib qolsa:

1. **Printerni o'chiring**
2. **Qog'ozni ehtiyotkorlik bilan chiqaring**
   * Yirtilmasligi uchun sekin torting
   * Qog'oz yo'nalishi bo'yicha torting
3. **Ichki qismlarni tekshiring**
   * Qog'oz qoldiqlari yo'qligini tekshiring
4. **Printerni qayta yoqing**

## Umumiy maslahatlar:

* **Sifatli qog'oz ishlating**
* **Kartrijlarni to'g'ri saqlang**
* **Printerni muntazam tozalang**
* **Firmware ni yangilab turing**

Texnik yordam kerak bo'lsa, biz bilan bog'laning!`,
    tags: ["printer", "chop etish", "kartirij", "qog'oz"],
    createdAt: "2024-01-05T16:20:00Z",
    updatedAt: "2024-01-28T09:40:00Z",
    viewCount: 134,
  },
  {
    id: "6",
    title: "Ma'lumotlarni zaxiralash va tiklash usullari",
    category: "Ma'lumotlar Xavfsizligi",
    content: `# Ma'lumotlarni zaxiralash va tiklash usullari

Muhim ma'lumotlaringizni yo'qotmaslik uchun zaxiralash juda muhim:

## Zaxiralash usullari:

### 1. Bulutli xizmatlar
* **Google Drive**: 15 GB bepul
* **OneDrive**: 5 GB bepul
* **Dropbox**: 2 GB bepul
* **iCloud**: Apple qurilmalari uchun

### 2. Tashqi qurilmalar
* **USB Flash Drive**: kichik fayllar uchun
* **Tashqi qattiq disk**: katta hajmdagi ma'lumotlar uchun
* **DVD/Blu-ray**: uzoq muddatli saqlash uchun

### 3. Tarmoq zaxiralash (NAS)
* Uy yoki ofis tarmoqida markazlashgan saqlash
* RAID konfiguratsiyasi bilan xavfsizlik

## Windows da avtomatik zaxiralash:

### File History yoqish:
1. Settings > Update & Security > Backup
2. "Add a drive" tugmasini bosing
3. Tashqi diskni tanlang
4. "Automatically back up my files" ni yoqing

### System Image yaratish:
1. Control Panel > System and Security > Backup and Restore
2. "Create a system image" ni tanlang
3. Zaxiralash joyini belgilang

## Ma'lumotlarni tiklash:

### 1. Recycle Bin dan tiklash
* O'chirilgan fayllar Recycle Bin da saqlanadi
* Fayl ustiga o'ng tugma bosib "Restore" ni tanlang

### 2. Previous Versions orqali
* Fayl yoki papka ustiga o'ng tugma bosing
* "Properties" > "Previous Versions"
* Kerakli versiyani tanlang

### 3. Maxsus dasturlar orqali
* **Recuva**: o'chirilgan fayllarni tiklash
* **PhotoRec**: rasm va video fayllar uchun
* **TestDisk**: disk bo'limlarini tiklash

## Zaxiralash qoidalari (3-2-1 qoidasi):

* **3 nusxa**: asl fayl + 2 ta zaxira nusxa
* **2 xil media**: masalan, qattiq disk + bulut
* **1 tashqi joy**: ofisdan tashqarida saqlash

## Muhim maslahatlar:

* **Muntazam zaxiralang**: haftada kamida bir marta
* **Zaxiralarni tekshiring**: tiklash mumkinligini sinab ko'ring
* **Muhim fayllarni shifrlang**: maxfiy ma'lumotlar uchun
* **Versiyalarni saqlang**: faylning turli versiyalari

Zaxiralash - bu sug'urta, kerak bo'lmaguncha qadar uning qiymatini bilmaysiz!`,
    tags: ["zaxira", "backup", "tiklash", "ma'lumot"],
    createdAt: "2024-01-03T12:10:00Z",
    updatedAt: "2024-01-30T15:25:00Z",
    viewCount: 178,
  },
]

export default function KnowledgeArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<KnowledgeArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiArticle = await apiClient.getKnowledgeArticle(params.id)
        setArticle(convertApiKnowledgeToKnowledge(apiArticle))
      } catch (error) {
        console.error("Error fetching knowledge article:", error)
        toast.error("Maqolani yuklashda xatolik")
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <KnowledgeArticleView article={article} />
      </div>
    </div>
  )
}
