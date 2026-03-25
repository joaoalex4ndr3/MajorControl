import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
}