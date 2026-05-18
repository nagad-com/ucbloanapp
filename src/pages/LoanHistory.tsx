import EmptyHistory from "@/components/EmptyHistory";
import BottomNav from "@/components/BottomNav";

export default function LoanHistory() {
  const isVip = typeof window !== "undefined" && localStorage.getItem("vip_loan") === "1";

  if (!isVip) {
    return <EmptyHistory title="লোন হিস্টরি" emptyText="আপনার বর্তমানে কোনো লোন নেওয়ার নেই" />;
  }

  const items = [
    { date: "০৮ মে, ২০২৬" },
    { date: "০৭ মে, ২০২৬" },
    { date: "০৭ মে, ২০২৬" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 bg-secondary/40">
        <h1 className="text-3xl font-extrabold text-brand-blue">লোন হিস্টরি</h1>
      </div>

      <div className="px-4 mt-5 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="bg-card rounded-2xl p-4 shadow-[var(--shadow-card)]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-brand-blue text-lg">৳ ২,০০০.০০</p>
                <p className="text-xs text-muted-foreground mt-0.5">{it.date}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                সফল
              </span>
            </div>
            <div className="border-t pt-2 mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">মেয়াদ</span>
                <span className="font-medium">১ বছর</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">মাধ্যম</span>
                <span className="font-medium">নগদ</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
