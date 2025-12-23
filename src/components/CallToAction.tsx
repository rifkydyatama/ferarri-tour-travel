"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

type CallToActionContent = {
  title: string;
  description: string;
  whatsappHref: string;
  secondary: { label: string; href: string };
};

export default function CallToAction({ content }: { content?: CallToActionContent }) {
  const whatsappHref = content?.whatsappHref ?? "https://wa.me/";
  
  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl relative overflow-hidden rounded-[3rem] bg-ferrari px-6 py-20 text-center sm:px-16 sm:py-24 shadow-2xl shadow-ferrari/30">
        
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-acid rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob [animation-delay:2s]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-6xl mb-6">
            {content?.title ?? "JANGAN CUMA WACANA, AYO BERANGKAT!"}
          </h2>
          <p className="mb-10 text-xl font-medium text-white/90">
            {content?.description ??
              "Konsultasi gratis, tanya-tanya dulu boleh banget. Kita bantu susun rencana study tour yang paling pas buat sekolahmu."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={whatsappHref}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ferrari transition hover:scale-105 hover:bg-acid hover:text-black shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}