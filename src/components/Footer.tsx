import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

type FooterContent = {
  description: string;
  quickLinks: Array<{ label: string; href: string }>;
  contact: {
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
  };
};

export default function Footer({ content }: { content?: FooterContent }) {
  const description = content?.description ??
    "Travel & Tour terpercaya untuk perjalanan yang seru, nyaman, dan penuh warna.";
  const quickLinks = content?.quickLinks ?? [];
  const contact = content?.contact;

  return (
    <footer id="kontak" className="bg-gray-900 text-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-ferrari to-sun bg-clip-text text-transparent">
                Ferrari Jaya
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">{description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80">QUICK LINKS</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {quickLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-white/70 transition hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-white/80">CONTACT</h3>
            <div className="mt-4 grid gap-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-ocean" />
                <div>
                  <p className="font-semibold text-white">
                    {contact?.addressLabel ?? "Address"}
                  </p>
                  <p>{contact?.address ?? "Jl. Contoh Alamat No. 123, Indonesia"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-sun" />
                <div>
                  <p className="font-semibold text-white">{contact?.phoneLabel ?? "Phone"}</p>
                  <p>{contact?.phone ?? "+62 8xx-xxxx-xxxx"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-leaf" />
                <div>
                  <p className="font-semibold text-white">{contact?.emailLabel ?? "Email"}</p>
                  <p>{contact?.email ?? "hello@ferrarijaya.co.id"}</p>
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
