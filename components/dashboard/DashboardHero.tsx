import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function DashboardHero() {

  return (
    <section className="relative bg-[url('https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg')] bg-cover bg-center py-20 md:py-32">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Siz Uchun IT Yordami
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                Biznes va shaxslar uchun professional IT yordam. Barcha texnologik ehtiyojlaringiz uchun tez, ishonchli va oson yechimlar.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link href="/tickets/new">Yordam So'rovi Yaratish</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link href="/knowledge">
                  Bilimlar Bazasini Ko'rish
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold">Tez Yordam Kerakmi?</h2>
            <p className="text-gray-200">Yangi yordam so'rovi yuborib, mutaxassislarimizdan yordam oling.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-black/20 p-4">
                <div className="text-sm">Ochiq So'rovlar</div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="rounded-lg bg-black/20 p-4">
                <div className="text-sm">O'rtacha Javob</div>
                <div className="text-2xl font-bold">2s 15d</div>
              </div>
            </div>
            <Button asChild className="w-full bg-white text-black hover:bg-gray-100">
              <Link href="/tickets/new">
                Yangi So'rov Boshlash <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
