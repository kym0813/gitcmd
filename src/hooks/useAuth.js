import { useEffect, useMemo, useState } from 'react';
import { ADMIN_EMAIL, supabase } from '../lib/supabase';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const isAdmin = useMemo(
    () => session?.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    [session]
  );

  return { session, user: session?.user || null, isAdmin, loading, signOut: () => supabase.auth.signOut() };
}
