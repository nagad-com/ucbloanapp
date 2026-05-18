import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Globe, Bell, Info, MessageCircle, FileText, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const items = [
  { icon: Globe, label: "অফিসিয়াল সাইট", url: "https://www.ucb.com.bd" },
  { icon: Info, label: "সম্পর্কে", url: "https://www.ucb.com.bd/banking/retail-banking/personal-loan" },
  { icon: MessageCircle, label: "WhatsApp যোগাযোগ", url: "https://wa.me/8801629220576" },
  { icon: FileText, label: "শর্তাবলী", url: "https://www.ucb.com.bd" },
];

export default function More() {
  const nav = useNavigate();
  const { logout } = useAuth();
  const [notif, setNotif] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 bg-secondary/40">
        <h1 className="text-3xl font-extrabold text-brand-blue">আরো</h1>
      </div>
      <div className="mx-4 mt-4 bg-card rounded-2xl border divide-y">
        <button onClick={() => setNotif(true)} className="w-full flex items-center gap-3 p-4">
          <Bell className="w-5 h-5 text-brand-blue" />
          <span className="flex-1 text-left font-semibold">নোটিফিকেশন</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        {items.map((it) => (
          <a key={it.label} href={it.url} target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 p-4">
            <it.icon className="w-5 h-5 text-brand-blue" />
            <span className="flex-1 text-left font-semibold">{it.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </a>
        ))}
        <button onClick={() => { logout(); nav("/login"); }} className="w-full flex items-center gap-3 p-4 text-destructive">
          <LogOut className="w-5 h-5" />
          <span className="flex-1 text-left font-semibold">লগআউট</span>
        </button>
      </div>

      <Dialog open={notif} onOpenChange={setNotif}>
        <DialogContent className="max-w-xs rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-brand-blue">নোটিফিকেশন</DialogTitle>
            <DialogDescription className="whitespace-pre-line text-foreground/80 pt-2">
              লোন নিতে হলে আপনার নগদে ১০০০ টাকার উপরে ব্যালেন্স থাকতে হবে। আমাদের সাথে হোয়াটসঅ্যাপে যোগাযোগ করে আপনার নগদে ১০০০ টাকার বেশি আছে এটা স্কিনশট দিয়ে দেখিয়ে একটা সিরিয়াল কোড নিতে হবে সেটা ব্যবহার করে লোন নিতে পারবেন।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setNotif(false)} className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">ঠিক আছে</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
