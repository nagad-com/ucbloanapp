import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Clock, Wallet, Mail, MoreHorizontal } from "lucide-react";

const items = [
  { i: HomeIcon, l: "হোম", path: "/" },
  { i: Clock, l: "হিস্টরি", path: "/history" },
  { i: Wallet, l: "অ্যাকাউন্ট", path: "/account" },
  { i: Mail, l: "ইনবক্স", path: "/inbox" },
  { i: MoreHorizontal, l: "আরো", path: "/more" },
];

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <div className="fixed bottom-0 inset-x-0 bg-card border-t flex justify-around py-2 max-w-md mx-auto z-50">
      {items.map((n) => {
        const active = loc.pathname === n.path;
        return (
          <button
            key={n.path}
            onClick={() => nav(n.path)}
            className={`flex flex-col items-center text-xs ${active ? "text-brand-blue font-bold" : "text-muted-foreground"}`}
          >
            <n.i className="w-5 h-5 mb-0.5" />
            {n.l}
          </button>
        );
      })}
    </div>
  );
}
