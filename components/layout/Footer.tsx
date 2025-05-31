export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium">Dern-Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Biznes va shaxslar uchun professional IT qo'llab-quvvatlash yechimlari.
            </p>
          </div>
          <div>
            <h3 className="text-base font-medium">Tezkor Havolalar</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Bosh Sahifa
                </a>
              </li>
              <li>
                <a href="/tickets" className="text-muted-foreground hover:text-primary transition-colors">
                  Mening So'rovlarim
                </a>
              </li>
              <li>
                <a href="/knowledge" className="text-muted-foreground hover:text-primary transition-colors">
                  Bilimlar Bazasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Xizmatlar</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Kompyuter Ta'mirlash</span>
              </li>
              <li>
                <span className="text-muted-foreground">Tarmoq Xizmatlari</span>
              </li>
              <li>
                <span className="text-muted-foreground">Ma'lumotlarni Tiklash</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium">Bog'lanish</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">+998 90 123 45 67</span>
              </li>
              <li>
                <span className="text-muted-foreground">info@dern-support.uz</span>
              </li>
              <li>
                <span className="text-muted-foreground">Toshkent, O'zbekiston</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Dern-Support. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
