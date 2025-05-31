import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Laptop, MessageSquare, Zap } from 'lucide-react';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DashboardFAQ } from '@/components/dashboard/DashboardFAQ';
import Image from 'next/image'

export default function Home() {
  const features = [
    {
      icon: <MessageSquare className="h-12 w-12 text-primary" />,
      title: 'Qo\'llab-quvvatlash Tizimi',
      description: 'Barcha IT muammolaringiz uchun qo\'llab-quvvatlash so\'rovlarini yarating va kuzating.',
      badge: 'Asosiy Xizmat',
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: 'Uchrashuvni Rejalashtirish',
      description: 'O\'zingizga qulay vaqtda ta\'mirlash uchun uchrashuv belgilang.',
      badge: 'Qulay',
    },
    {
      icon: <Laptop className="h-12 w-12 text-primary" />,
      title: 'Qurilmani Ta\'mirlash',
      description: 'Barcha qurilmalaringiz va IT infratuzilmangiz uchun professional ta\'mirlash xizmatlari.',
      badge: 'Professional',
    },
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: 'Tezkor Yechim',
      description: 'Texniklarimiz ishingizni to\'xtatmaslik uchun tez ishlaydilar.',
      badge: 'Samarali',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <DashboardHero />

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Keng Qamrovli IT Yordam Xizmatlari
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
{"                Texnologiyangizni yaxshi ishlashi uchun kerak bo'lgan barcha narsalar, bir joyda."}              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-10 md:grid-cols-2 lg:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute right-2 top-2">
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">Bizning Xizmatlarimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
            
                      <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg" 

                alt="Tarmoq sozlamalari"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{"Kompyuter Ta'mirlash"}</h3>
                <p className="text-muted-foreground">{"Professional darajada kompyuter ta'mirlash xizmatlari"}</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* <img
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg" 
                alt="Tarmoq sozlamalari" 
                className="w-full h-64 object-cover"
              /> */}
                      <Image
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
                alt="Tarmoq sozlamalari"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Tarmoq Xizmatlari</h3>
                <p className="text-muted-foreground">Tarmoq muammolarini hal qilish va optimizatsiya</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">

                    <Image
                src="https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg" 
                alt="Tarmoq sozlamalari"
                width={400}
                height={256}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{"Ma'lumotlarni Tiklash"}</h3>
                <p className="text-muted-foreground">{"Yo'qolgan ma'lumotlarni professional tiklash"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <DashboardFAQ />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Boshlashga tayyormisiz?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
{"                Bugun hisob yarating va o'zingizga qulay vaqtda professional IT yordamidan foydalaning."}              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
             <Button asChild className="w-full bg-white text-black hover:bg-gray-100">
              <Link href="/tickets/new">
                Yangi So'rov Boshlash 
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
