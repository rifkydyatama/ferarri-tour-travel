import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 text-center">
            <div className="rounded-2xl border border-red-200 bg-white p-10 shadow-sm">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                    Terjadi Kesalahan
                </h1>
                <p className="mt-2 text-base text-slate-600">{message}</p>
                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
