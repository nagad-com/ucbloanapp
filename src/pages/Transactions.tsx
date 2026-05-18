import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { ArrowDownLeft, ArrowUpRight, Wallet, Search, Filter } from "lucide-react";

const chips = ["সব", "আজকে", "গতকাল", "১ মাস", "১ বছর"];

export default function Transactions() {
  const [tab, setTab] = useState(0);
  const [chip, setChip] = useState(0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero header */}
      <div className="relative px-5 pt-8 pb-20 bg-gradient-to-br from-brand-blue to-[hsl(215_85%_25%)] text-white rounded-b-[2rem] shadow-[var(--shadow-button)]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">লেনদেন হিস্টরি</h1>
          <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
            <Filter size={18} />
          </button>
        </div>
        <p className="text-xs text-white/70 mt-1">আপনার সব আর্থিক কার্যক্রম এক জায়গায়</p>

        {/* Balance summary card */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <SummaryItem icon={<Wallet size={16} />} label="মোট" value="৳ ০" />
          <SummaryItem icon={<ArrowDownLeft size={16} />} label="জমা" value="৳ ০" tone="green" />
          <SummaryItem icon={<ArrowUpRight size={16} />} label="খরচ" value="৳ ০" tone="red" />
        </div>
      </div>

      {/* Floating search */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] flex items-center gap-2 px-4 py-3 border border-border/50">
          <Search size={18} className="text-muted-foreground" />
          <input
            placeholder="লেনদেন খুঁজুন..."
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 bg-secondary rounded-full p-1 grid grid-cols-2 text-sm font-semibold">
        {["বিবরণী", "সারসংক্ষেপ"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`py-2.5 rounded-full transition-all ${
              tab === i
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-button)]"
                : "text-foreground/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="mx-4 mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {chips.map((c, i) => (
          <button
            key={c}
            onClick={() => setChip(i)}
            className={`px-4 py-1.5 rounded-full border text-sm whitespace-nowrap font-medium transition ${
              chip === i
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-card text-foreground/70 border-border"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center mt-16 px-6 text-center">
        <div className="relative w-44 h-44">
          <div className="absolute inset-0 rounded-full bg-secondary/70 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-card shadow-[var(--shadow-card)] flex items-center justify-center">
            <Wallet size={56} className="text-brand-blue" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="mt-6 text-lg font-bold text-foreground">কোনো লেনদেন নেই</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          আপনার এখনো কোনো ট্রানজেকশন রেকর্ড নেই। লোন নিলে এখানে দেখতে পাবেন।
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

function SummaryItem({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "green" | "red";
}) {
  const toneCls =
    tone === "green"
      ? "bg-emerald-400/20 text-emerald-200"
      : tone === "red"
      ? "bg-rose-400/20 text-rose-200"
      : "bg-white/15 text-white";
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/10">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${toneCls}`}>
        {icon}
      </div>
      <p className="text-[10px] text-white/70 mt-2">{label}</p>
      <p className="text-sm font-bold tabular-nums">{value}</p>
    </div>
  );
}
