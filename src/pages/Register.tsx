import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11) return toast.error("সঠিক ফোন নাম্বার দিন");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    setBusy(true);
    const r = await register({ name, phone, password });
    setBusy(false);
    if (r.ok) {
      toast.success("রেজিস্ট্রেশন সফল");
      nav("/");
    } else toast.error(r.error || "রেজিস্ট্রেশন ব্যর্থ");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-3 overflow-hidden">
            <img src="https://bkwin999.top/pic/ucbloan.png" alt="UCB" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-brand-blue">রেজিস্ট্রেশন</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <Input placeholder="পূর্ণ নাম" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input type="password" placeholder="পাসওয়ার্ড" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" disabled={busy} className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">{busy ? "অপেক্ষা করুন..." : "রেজিস্ট্রেশন"}</Button>
        </form>
        <p className="text-center text-sm mt-4">
          অ্যাকাউন্ট আছে? <Link to="/login" className="text-brand-blue font-semibold">লগইন</Link>
        </p>
      </div>
    </div>
  );
}
