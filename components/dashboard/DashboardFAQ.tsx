import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function DashboardFAQ() {
  const faqs = [
    {
      question: "Qanday qilib yordam so'rovi yarataman?",
      answer: "Saytning yuqori qismidagi 'Yordam So'rovi Yaratish' tugmasini bosing. Kerakli ma'lumotlarni kiriting va so'rovingizni yuboring. Bizning mutaxassislarimiz tez orada siz bilan bog'lanishadi."
    },
    {
      question: "Ta'mirlash xizmati qancha vaqt oladi?",
      answer: "Ta'mirlash muddati muammoning murakkabligiga qarab 1-5 ish kunini tashkil qiladi. Aniq muddat dastlabki diagnostika paytida belgilanadi."
    },
    {
      question: "Narxlar qanday hisoblanadi?",
      answer: "Narxlar diagnostika, ehtiyot qismlar va ish haqini o'z ichiga oladi. Dastlabki narx diagnostikadan so'ng belgilanadi va siz bilan kelishiladi."
    },
    {
      question: "Kafolat mavjudmi?",
      answer: "Ha, barcha ta'mirlash ishlari 3 oylik kafolat bilan ta'minlanadi. Kafolat muddati davomida yuzaga kelgan muammolar bepul bartaraf etiladi."
    },
    {
      question: "To'lov usullari qanday?",
      answer: "Naqd pul, bank kartasi va onlayn to'lov tizimlarini qabul qilamiz. To'lov xizmat ko'rsatilgandan so'ng amalga oshiriladi."
    },
    {
      question: "Ofisga bormasdan xizmatdan foydalansa bo'ladimi?",
      answer: "Ha, kuryer xizmatimiz mavjud. Qurilmangizni olib ketish va qaytarib berish xizmatidan foydalanishingiz mumkin."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Ko'p So'raladigan Savollar</h2>
          <p className="text-muted-foreground">
            Mijozlarimiz tomonidan eng ko'p so'raladigan savollarga javoblar
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
