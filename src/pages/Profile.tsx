import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";
import { ShieldPlus, Landmark, UserCircle2, ListOrdered, LogOut } from "lucide-react";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card rounded-xl p-4 border">
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="text-xl font-extrabold">{value}</p>
  </div>
);

const Action = ({ icon: Icon, label, onClick }: any) => (
  <button onClick={onClick} className="bg-card rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border shadow-sm">
    <Icon className="w-9 h-9 text-destructive" />
    <span className="font-bold">{label}</span>
  </button>
);

export default function Profile() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-[image:var(--gradient-header)] px-5 pt-8 pb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center shadow-md">
            <UserCircle2 className="w-10 h-10 text-brand-blue" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-primary-foreground">{user?.name}</h2>
            <p className="text-sm text-primary-foreground/90">{user?.phone}</p>
            <div className="mt-2 flex gap-2">
              <span className="px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">Active</span>
              <span className="px-3 py-0.5 rounded-full bg-secondary text-foreground text-xs font-bold">User</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 -mt-6 bg-card rounded-2xl p-4 border shadow-sm grid grid-cols-2 gap-3">
        <Stat label="ব্যালেন্স" value={`৳${user?.balance.toFixed(2)}`} />
        <Stat label="মোট লোন" value="1" />
        <Stat label="অ্যাপ্রুভড" value="0" />
        <Stat label="পেন্ডিং" value="0" />
        <Stat label="মোট ইএমআই পরিশোধ" value="৳0.00" />
        <Stat label="মোট উইথড্র" value="৳0.00" />
      </div>

      <div className="mx-4 mt-6 bg-card rounded-2xl p-5 border shadow-sm">
        <h3 className="text-destructive font-extrabold mb-4">কুইক অ্যাকশন</h3>
        <div className="grid grid-cols-2 gap-3">
          <Action icon={ShieldPlus} label="নতুন লোন" onClick={() => nav("/loan")} />
          <Action icon={Landmark} label="আমার লোন" onClick={() => nav("/loan-history")} />
          <Action icon={UserCircle2} label="প্রোফাইল আপডেট" onClick={() => {}} />
          <Action icon={ListOrdered} label="লেনদেন" onClick={() => nav("/history")} />
        </div>
      </div>

      <div className="mx-4 mt-6 bg-card rounded-2xl p-5 border shadow-sm">
        <h3 className="text-destructive font-extrabold mb-3">অন্যান্য তথ্য</h3>
        <p className="text-sm text-muted-foreground">ঠিকানা</p>
        <p className="text-foreground">—</p>
      </div>

      <button
        onClick={() => { logout(); nav("/login"); }}
        className="mx-4 mt-6 w-[calc(100%-2rem)] bg-destructive text-destructive-foreground rounded-xl py-3 font-bold flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" /> লগআউট
      </button>

      <BottomNav />
    </div>
  );
}
