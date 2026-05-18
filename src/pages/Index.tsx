import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Home from "./Home";

const Index = () => {
  const { user, session, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-secondary" />;
  if (!session) return <Navigate to="/login" replace />;
  if (!user) return <div className="min-h-screen bg-secondary" />;
  return <Home />;
};

export default Index;
