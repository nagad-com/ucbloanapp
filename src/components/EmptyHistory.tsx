import { useState } from "react";
import BottomNav from "./BottomNav";

type Props = {
  title: string;
  emptyText: string;
  titleColor?: "blue" | "dark";
  chips?: string[];
};

export default function EmptyHistory({ title, emptyText, titleColor = "blue", chips }: Props) {
  const [tab, setTab] = useState(0);
  const [chip, setChip] = useState(0);
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 bg-secondary/40">
        <h1 className={`text-3xl font-extrabold ${titleColor === "blue" ? "text-brand-blue" : "text-foreground"}`}>{title}</h1>
      </div>

      <div className="mx-4 mt-4 bg-secondary rounded-full p-1 grid grid-cols-2 text-sm font-semibold">
        {["লেনদেন বিবরণী", "লেনদেন সারসংক্ষেপ"].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`py-2 rounded-full transition ${tab === i ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {chips && (
        <div className="mx-4 mt-4 flex gap-2 overflow-x-auto pb-1">
          {chips.map((c, i) => (
            <button
              key={c}
              onClick={() => setChip(i)}
              className={`px-4 py-1.5 rounded-full border text-sm whitespace-nowrap ${
                chip === i ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/70 border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-16 px-6 text-center">
        <div className="w-56 h-56 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <ellipse cx="80" cy="110" rx="70" ry="55" fill="hsl(48 100% 75% / 0.6)" />
            <rect x="70" y="40" width="70" height="120" rx="12" fill="hsl(215 85% 35%)" />
            <rect x="76" y="50" width="58" height="95" rx="4" fill="hsl(48 100% 65%)" />
            <rect x="60" y="115" width="90" height="55" fill="hsl(35 60% 70%)" stroke="hsl(25 50% 35%)" strokeWidth="2" />
            <polygon points="60,115 105,100 150,115 105,130" fill="hsl(35 80% 80%)" stroke="hsl(25 50% 35%)" strokeWidth="2" />
          </svg>
        </div>
        <p className="mt-6 text-lg text-muted-foreground font-medium max-w-xs">{emptyText}</p>
      </div>

      <BottomNav />
    </div>
  );
}
