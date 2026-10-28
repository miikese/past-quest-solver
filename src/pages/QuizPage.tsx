import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { sampleQuestions } from '@/data/questions';
import { selectPracticeQuestions, summarizePractice } from '@/lib/practice.mjs';

type Review = { questionId: string; understood: boolean };

const QuizPage = () => {
  const [params] = useSearchParams();
  const subject = params.get('subject') || '';
  // Keying the session also resets progress when a subject changes.
  return <PracticeSession key={subject} subject={subject} />;
};

function PracticeSession({ subject }: { subject: string }) {
  const [round, setRound] = useState(0);
  const questions = useMemo(() => selectPracticeQuestions(sampleQuestions, subject), [subject, round]);
  const [answers, setAnswers] = useState<Review[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState('');
  const question = questions[answers.length];
  const summary = summarizePractice(answers);
  const restart = () => { setAnswers([]); setRevealed(false); setDraft(''); setRound(value => value + 1); };
  const assess = (understood: boolean) => {
    setAnswers(previous => [...previous, { questionId: question.id, understood }]);
    setRevealed(false);
    setDraft('');
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Button asChild variant="ghost" className="mb-6"><Link to="/questions">← Question library</Link></Button>
      <div className="flex items-center gap-3 mb-4"><BookOpen className="text-primary" aria-hidden="true" /><h1 className="text-2xl font-bold">{subject || 'Mixed subject'} practice</h1></div>
      <p className="text-muted-foreground mb-6">Sample study material. Write your own response, compare it with the explanation, then decide what to revisit. Self-assessment is not a marked exam. Responses stay on this page and are cleared when you leave.</p>
      {!questions.length ? (
        <Card><CardHeader><CardTitle>No practice questions for this subject</CardTitle></CardHeader><CardContent><Link className="underline" to="/questions">Choose another subject</Link></CardContent></Card>
      ) : !question ? (
        <Card><CardHeader><CardTitle>Session reviewed</CardTitle></CardHeader><CardContent className="space-y-5">
          <p>{summary.total} questions reviewed · {summary.understood} understood · {summary.revisit} to revisit.</p>
          <p className="text-sm text-muted-foreground">These totals reflect your own assessment, not automatically verified answers.</p>
          <Button onClick={restart}><RotateCcw className="mr-2 h-4 w-4" />Start another session</Button>
        </CardContent></Card>
      ) : (
        <>
          <p className="text-sm mb-2">Question {answers.length + 1} of {questions.length}</p>
          <Progress aria-label="Questions reviewed" value={(answers.length / questions.length) * 100} className="mb-6" />
          <Card><CardHeader><p className="text-sm text-muted-foreground">{question.subject} · {question.difficulty} · Sample {question.year}</p><CardTitle className="leading-relaxed">{question.questionText}</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <label className="block font-medium" htmlFor="practice-response">Your response (optional)</label>
              <textarea id="practice-response" className="w-full min-h-32 rounded-lg border bg-background p-3" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Work through the question before revealing the explanation." />
              {!revealed ? <Button onClick={() => setRevealed(true)}>Compare with explanation</Button> : <section aria-label="Sample explanation" className="space-y-4">
                <h2 className="font-semibold">Sample explanation</h2><p className="whitespace-pre-line rounded-lg bg-muted p-4">{question.answerText}</p>
                <p>How confident do you feel about this question?</p>
                <div className="flex flex-wrap gap-3"><Button onClick={() => assess(true)}>I understand this</Button><Button variant="outline" onClick={() => assess(false)}>Revisit this topic</Button></div>
              </section>}
            </CardContent>
          </Card>
        </>
      )}
    </main>
  );
}
export default QuizPage;
