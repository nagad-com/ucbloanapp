import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Loan from "./pages/Loan.tsx";
import NotFound from "./pages/NotFound.tsx";
import Transactions from "./pages/Transactions.tsx";
import LoanHistory from "./pages/LoanHistory.tsx";
import CashoutHistory from "./pages/CashoutHistory.tsx";
import DepositHistory from "./pages/DepositHistory.tsx";
import Profile from "./pages/Profile.tsx";
import Inbox from "./pages/Inbox.tsx";
import More from "./pages/More.tsx";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-secondary" />;
  return session ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loan" element={<Protected><Loan /></Protected>} />
            <Route path="/history" element={<Protected><Transactions /></Protected>} />
            <Route path="/loan-history" element={<Protected><LoanHistory /></Protected>} />
            <Route path="/cashout-history" element={<Protected><CashoutHistory /></Protected>} />
            <Route path="/deposit-history" element={<Protected><DepositHistory /></Protected>} />
            <Route path="/account" element={<Protected><Profile /></Protected>} />
            <Route path="/inbox" element={<Protected><Inbox /></Protected>} />
            <Route path="/more" element={<Protected><More /></Protected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
