import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Banknote, HandCoins, Home as HomeIcon, Wallet, Smartphone, History, Receipt, UserCircle,
  Clock, Globe, Bell, Info, MessageCircle
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const services = [
  { icon: Banknote, label: "লোন", action: "loan", color: "text-amber-600" },
  { icon: HandCoins, label: "ক্যাশ আউট", action: "cashout", color: "text-emerald-600" },
  { icon: HomeIcon, label: "জমা দিন", action: "deposit", color: "text-rose-600" },
  { icon: Wallet, label: "আমার লোন", action: "myloan", color: "text-emerald-700" },
  { icon: Smartphone, label: "লেনদেন সমূহ", action: "tx", color: "text-emerald-600" },
  { icon: History, label: "লোন হিস্ট্রি", action: "loanhistory", color: "text-purple-600" },
  { icon: Receipt, label: "ক্যাশ আউট হিস্ট্রি", action: "couthistory", color: "text-rose-600" },
  { icon: UserCircle, label: "প্রোফাইল", action: "profile", color: "text-blue-600" },
  { icon: Clock, label: "জমা হিস্ট্রি", action: "depositHistory", color: "text-orange-500" },
];

const aboutItems = [
  { icon: Globe, label: "অফিসিয়াল সাইট", url: "https://www.ucb.com.bd" },
  { icon: Bell, label: "নোটিফিকেশন", action: "notification" },
  { icon: Info, label: "সম্পর্কে", url: "https://www.ucb.com.bd/banking/retail-banking/personal-loan" },
  { icon: MessageCircle, label: "যোগাযোগ", url: "https://nagad.com.winxpro.top/about/" },
];

export default function Home() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [popup, setPopup] = useState<{ title: string; desc: string } | null>(null);

  const handle = (action: string) => {
    switch (action) {
      case "loan":
        nav("/loan");
        break;
      case "cashout":
        setPopup({ title: "দুঃখিত", desc: "আপনার একাউন্টে ব্যালেন্স নেই।" });
        break;
      case "deposit":
        setPopup({ title: "তথ্য", desc: "জমা সেবা শীঘ্রই আসছে।" });
        break;
      case "myloan":
        nav("/loan-history");
        break;
      case "tx":
        nav("/history");
        break;
      case "loanhistory":
        nav("/loan-history");
        break;
      case "couthistory":
        nav("/cashout-history");
        break;
      case "depositHistory":
        nav("/deposit-history");
        break;
      case "notification":
        setPopup({
          title: "নোটিফিকেশন",
          desc: "লোন নিতে হলে আপনার নগদে ১০০০ টাকার উপরে ব্যালেন্স থাকতে হবে। আমাদের সাথে হোয়াটসঅ্যাপে যোগাযোগ করে আপনার নগদে ১০০০ টাকার বেশি আছে এটা স্কিনশট দিয়ে দেখিয়ে একটা সিরিয়াল কোড নিতে হবে সেটা ব্যবহার করে লোন নিতে পারবেন।",
        });
        break;
      case "profile":
        nav("/account");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <div className="bg-[image:var(--gradient-header)] px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center shadow-md">
            <span className="text-xl font-extrabold text-brand-blue">UCB</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-primary-foreground">{user?.name}</h2>
            <p className="text-sm text-primary-foreground/80">{user?.phone}</p>
          </div>
          <button
            onClick={() => setShowBalance((s) => !s)}
            className="bg-brand-blue text-brand-blue-foreground rounded-full px-5 py-2 text-sm font-semibold shadow-[var(--shadow-button)]"
          >
            {showBalance ? `৳${user?.balance.toFixed(2)}` : "ব্যালেন্স"}
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="mx-4 -mt-4 bg-card rounded-2xl p-4 shadow-[var(--shadow-card)] grid grid-cols-4 gap-y-5 gap-x-2">
        {services.map((s) => (
          <button key={s.label} onClick={() => handle(s.action)} className="flex flex-col items-center gap-2 text-center">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <s.icon className={`w-7 h-7 ${s.color}`} />
            </div>
            <span className="text-[11px] font-semibold leading-tight">{s.label}</span>
          </button>
        ))}
      </div>

      {/* About */}
      <div className="mx-4 mt-6">
        <h3 className="text-brand-blue font-bold mb-3">আমাদের সম্পর্কে</h3>
        <div className="grid grid-cols-4 gap-2 bg-card rounded-2xl p-4 shadow-[var(--shadow-card)]">
          {aboutItems.map((a) => (
            <button
              key={a.label}
              onClick={() => (a.url ? window.open(a.url, "_blank") : handle(a.action!))}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <a.icon className="w-7 h-7 text-brand-blue" />
              </div>
              <span className="text-[11px] font-semibold leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => { logout(); nav("/login"); }} className="mt-6 mx-4 text-sm text-muted-foreground underline">লগআউট</button>

      <BottomNav />

      <Dialog open={!!popup} onOpenChange={() => setPopup(null)}>
        <DialogContent className="max-w-xs rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-brand-blue">{popup?.title}</DialogTitle>
            <DialogDescription className="whitespace-pre-line text-foreground/80 pt-2">{popup?.desc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setPopup(null)} className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">ঠিক আছে</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
