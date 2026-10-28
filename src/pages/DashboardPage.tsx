import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { loadAccountHistory, signOutAccount } from '@/lib/account.mjs';

type Account = { email?: string; user_metadata?: { full_name?: string } };
type SavedAnswer = { id: string; subject: string };

const DashboardPage = () => {
  const [user, setUser] = useState<Account | null>(null);
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError('');
    setUser(null);
    setAnswers([]);
    loadAccountHistory(supabase).then(result => {
      if (!active) return;
      if (!result.user) { navigate('/auth', { replace: true }); return; }
      setUser(result.user);
      setAnswers(result.answers);
    }).catch(() => {
      if (active) setError('Your saved account activity could not be loaded. Check your connection and try again.');
    }).finally(() => { if (active) setIsLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_OUT' && active) {
        setUser(null);
        setAnswers([]);
        navigate('/auth', { replace: true });
      }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [attempt, navigate]);

  const signOut = async () => {
    setIsSigningOut(true);
    setError('');
    try {
      await signOutAccount(supabase);
      setUser(null);
      setAnswers([]);
      navigate('/', { replace: true });
    } catch {
      setError('Sign out could not be completed. Please try again.');
    } finally { setIsSigningOut(false); }
  };

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-primary font-medium">Smile Learning</p><h1 className="text-3xl font-bold mt-2">Your account</h1></div>
        {user && <Button variant="outline" disabled={isSigningOut} onClick={signOut}><LogOut className="mr-2 h-4 w-4" />{isSigningOut ? 'Signing out…' : 'Sign out'}</Button>}
      </header>
      {isLoading ? <p role="status">Loading your account activity…</p> : error ? <Card><CardContent className="pt-6 space-y-4"><p role="alert">{error}</p><Button onClick={() => setAttempt(value => value + 1)}><RotateCcw className="mr-2 h-4 w-4" />Try again</Button></CardContent></Card> : user && <>
        <Card><CardHeader><CardTitle>Hello, {user.user_metadata?.full_name || 'learner'}</CardTitle></CardHeader><CardContent><p className="break-words">{user.email}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Saved account activity</CardTitle></CardHeader><CardContent className="space-y-3">
          <p>{answers.length} previously saved responses.</p>
          <p className="text-muted-foreground">These records may come from an earlier prototype. They are not verified exam results. Current self-assessment sessions stay on the practice page and do not add scores to your account.</p>
          {answers.length > 0 && <ul className="list-disc pl-5">{[...new Set(answers.map(answer => answer.subject))].map(subject => <li key={subject}>{subject}: {answers.filter(answer => answer.subject === subject).length} responses</li>)}</ul>}
        </CardContent></Card>
      </>}
      <div className="flex flex-wrap gap-4"><Button asChild><Link to="/quiz"><BookOpen className="mr-2 h-4 w-4" />Practice without grading</Link></Button><Button asChild variant="outline"><Link to="/questions">Explore sample questions</Link></Button></div>
    </main>
  );
};
export default DashboardPage;
