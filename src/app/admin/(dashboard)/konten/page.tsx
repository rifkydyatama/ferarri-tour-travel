import { getHomeContent } from "@/lib/landing/getHomeContent";
import LandingContentEditor from "./LandingContentEditor";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function KontenPage() {
  // Ambil data konten terbaru dari server/file
  const content = await getHomeContent();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
           <h1 className="text-3xl font-black tracking-tighter text-slate-900">
             KONTEN WEBSITE
           </h1>
           <p className="text-slate-500 font-medium">
             Atur teks, harga paket, dan promo yang tampil di halaman depan.
           </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold text-slate-600">
            <FileText className="w-4 h-4" />
            Editor Mode: Live
        </div>
      </div>

      {/* Editor Component */}
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-1 shadow-sm overflow-hidden">
        <LandingContentEditor initialContent={content} />
      </div>
    </div>
  );
}