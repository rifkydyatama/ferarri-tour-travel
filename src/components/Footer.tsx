import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
                Ferrari Jaya
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              Travel & Tour terpercaya untuk perjalanan yang seru, nyaman, dan penuh warna.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80">QUICK LINKS</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/" className="text-white/70 transition hover:text-white">
                Home
              </Link>
              <Link href="/tentang-kami" className="text-white/70 transition hover:text-white">
                Tentang Kami
              </Link>
              <Link href="/syarat-ketentuan" className="text-white/70 transition hover:text-white">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="text-white/70 transition hover:text-white">
                Packages
              </Link>
              <Link href="#" className="text-white/70 transition hover:text-white">
                Fleet
              </Link>
              <Link href="#" className="text-white/70 transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80">CONTACT</h3>
            <div className="mt-4 grid gap-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-ocean" />
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p>Jl. Contoh Alamat No. 123, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-sun" />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p>+62 8xx-xxxx-xxxx</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-leaf" />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p>hello@ferrarijaya.co.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-xs text-white/50">
          © {new Date().getFullYear()} Ferrari Jaya Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
