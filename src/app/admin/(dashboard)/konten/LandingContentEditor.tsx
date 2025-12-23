"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Loader2, LayoutTemplate, Bus, Star, MessageSquare } from "lucide-react";
import { updateHomeContent } from "./actions"; // Pastikan actions.ts ada
import type { HomeContent } from "@/lib/landing/types";

type TabKey = "hero" | "stats" | "packages" | "testimonials";

export default function LandingContentEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState<HomeContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Helper untuk update state nested
  const updateSection = (section: keyof HomeContent, key: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      // Panggil Server Action untuk save ke file/DB
      await updateHomeContent(content);
      setMessage({ type: "success", text: "Berhasil update konten! 🎉" });
    } catch (error) {
      setMessage({ type: "error", text: "Gagal menyimpan. Coba lagi." });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero & Intro", icon: LayoutTemplate },
    { id: "stats", label: "Fitur & Keunggulan", icon: Star },
    { id: "packages", label: "Paket & Harga", icon: Bus },
    { id: "testimonials", label: "Testimoni", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[600px]">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col gap-2">
        {tabs.map((tab) => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           return (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 translate-x-1" 
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                }`}
            >
                <Icon className={`w-4 h-4 ${isActive ? "text-acid" : "text-slate-400"}`} />
                {tab.label}
            </button>
           );
        })}
        
        <div className="mt-auto pt-6 border-t border-slate-200">
            {message && (
                <div className={`mb-4 px-3 py-2 rounded-lg text-xs font-bold text-center ${
                    message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                    {message.text}
                </div>
            )}
            <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-ferrari text-white py-3 rounded-xl font-bold hover:bg-red-600 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-ferrari/20"
            >
                {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                Simpan Perubahan
            </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 p-6 md:p-8 bg-white relative overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 max-w-2xl"
            >
                {/* === HERO TAB === */}
                {activeTab === "hero" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Headline Utama</label>
                            <input
                                type="text"
                                value={content.hero.title}
                                onChange={(e) => updateSection("hero", "title", e.target.value)}
                                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-acid focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Sub-Headline</label>
                            <textarea
                                rows={3}
                                value={content.hero.subtitle}
                                onChange={(e) => updateSection("hero", "subtitle", e.target.value)}
                                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-acid focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Label Tombol Utama</label>
                                <input
                                    type="text"
                                    value={content.hero.primary.label}
                                    onChange={(e) => setContent(prev => ({...prev, hero: {...prev.hero, primary: {...prev.hero.primary, label: e.target.value}}}))}
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Label Tombol Sekunder</label>
                                <input
                                    type="text"
                                    value={content.hero.secondary.label}
                                    onChange={(e) => setContent(prev => ({...prev, hero: {...prev.hero, secondary: {...prev.hero.secondary, label: e.target.value}}}))}
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-sm"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* === STATS / FEATURES TAB === */}
                {activeTab === "stats" && (
                     <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Judul Section Features</label>
                            <input
                                type="text"
                                value={content.features.title}
                                onChange={(e) => updateSection("features", "title", e.target.value)}
                                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                            />
                        </div>
                         <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
                            🚧 Fitur edit detail item (icon/desc) sedang dalam pengembangan. Saat ini hanya judul section yang bisa diedit.
                        </div>
                    </div>
                )}
                
                 {/* === PACKAGES TAB === */}
                {activeTab === "packages" && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Judul Section Paket</label>
                            <input
                                type="text"
                                value={content.packages.title}
                                onChange={(e) => updateSection("packages", "title", e.target.value)}
                                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                            />
                        </div>
                        {content.packages.items.map((pkg, idx) => (
                             <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-400">Paket #{idx + 1}</span>
                                </div>
                                <input
                                    type="text"
                                    value={pkg.title}
                                    // Note: Ini simplified, idealnya pakai handler khusus untuk array update
                                    onChange={(e) => {
                                        const newItems = [...content.packages.items];
                                        newItems[idx] = { ...pkg, title: e.target.value };
                                        updateSection("packages", "items", newItems);
                                    }}
                                    className="w-full p-2 mb-2 rounded-lg bg-white border border-slate-200 font-bold text-sm"
                                />
                                 <input
                                    type="text"
                                    value={pkg.subtitle}
                                    onChange={(e) => {
                                        const newItems = [...content.packages.items];
                                        newItems[idx] = { ...pkg, subtitle: e.target.value };
                                        updateSection("packages", "items", newItems);
                                    }}
                                    className="w-full p-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600"
                                />
                             </div>
                        ))}
                    </div>
                )}

                {/* === TESTIMONIALS TAB === */}
                {activeTab === "testimonials" && (
                     <div className="space-y-6">
                        <div className="flex items-center justify-center h-40 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
                             <p className="text-slate-400 font-bold text-sm">Review dikelola otomatis dari database.</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}