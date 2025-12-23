"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

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
  const quickLinks = content?.quickLinks ?? [];
  const contact = content?.contact;

  return (
    <footer id="kontak" className="bg-black text-white pt-24 pb-12 rounded-t-[3rem] -mt-12 relative z-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-black tracking-tighter italic">
                  <span className="text-ferrari">FERRARI</span>
                  <span className="text-white">TOUR</span>
                </span>
            </Link>
            <p className="text-lg text-white/60 font-medium max-w-sm leading-relaxed">
              {content?.description ?? "Partner perjalanan edukasi & wisata nomor satu untuk sekolah yang pengen experience lebih dari sekadar jalan-jalan."}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono text-acid font-bold tracking-widest mb-6">MENU</h3>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                    {l.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h3 className="font-mono text-acid font-bold tracking-widest mb-6">KONTAK</h3>
             <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/70">
                    <MapPin className="w-5 h-5 text-ferrari shrink-0" />
                    <span className="font-medium">{contact?.address || "Indonesia"}</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                    <Phone className="w-5 h-5 text-ferrari shrink-0" />
                    <span className="font-medium">{contact?.phone || "+62 812-3456-7890"}</span>
                </li>
                <li className="flex items-center gap-3 text-white/70">
                    <Mail className="w-5 h-5 text-ferrari shrink-0" />
                    <span className="font-medium">{contact?.email || "hello@ferrari.com"}</span>
                </li>
             </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/40">
            © {new Date().getFullYear()} Ferrari Tour & Travel. All rights reserved.
          </p>
          <p className="text-sm font-bold text-white/40">
            Dibuat dengan 🔥 oleh Tim IT
          </p>
        </div>
      </div>
    </footer>
  );
}