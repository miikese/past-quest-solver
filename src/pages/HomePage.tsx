import { Link } from 'react-router-dom';
import { BookOpen, Search, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sampleQuestions } from '@/data/questions';

const subjects = [...new Set(sampleQuestions.map(question => question.subject))];
const HomePage = () => (
  <div className="min-h-screen bg-background">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">Skip to content</a>
    <header className="bg-gradient-hero text-white">
      <nav aria-label="Main navigation" className="container mx-auto px-4 py-6 flex flex-wrap justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl"><GraduationCap aria-hidden="true" />Smile Learning</Link>
        <div className="flex gap-5"><Link to="/questions">Question library</Link><Link to="/quiz">Practice</Link><Link to="/auth">Account</Link></div>
      </nav>
      <div className="container mx-auto px-4 pt-12 pb-20 max-w-5xl">
        <p className="uppercase tracking-widest text-sm mb-5 text-white/80">A study interface by Michael Ikese Emmanuel</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">A little practice.<br />A clearer understanding.</h1>
        <p className="text-lg text-white/90 max-w-2xl mb-8">Explore sample questions, compare explanations and spend time on the topics that need another look. Start studying without an account.</p>
        <div className="flex flex-wrap gap-4"><Button asChild size="lg" className="bg-white text-primary hover:bg-white/90"><Link to="/questions">Explore questions<ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10"><Link to="/quiz">Start a practice session</Link></Button></div>
      </div>
    </header>
    <main id="main" className="container mx-auto px-4 py-12 space-y-12">
      <section aria-label="About the study material" className="rounded-xl border bg-muted/40 p-6"><h2 className="font-semibold mb-2">A learning prototype, open to explore</h2><p className="text-muted-foreground">{sampleQuestions.length} sample questions across {subjects.length} subjects. This material is for practice and has not been independently reviewed as an official exam bank. Check important answers against your course materials.</p></section>
      <section><h2 className="text-2xl font-bold mb-6">Build your own study rhythm</h2><div className="grid md:grid-cols-3 gap-5">{[
        { icon: Search, title: 'Find a useful starting point', text: 'Search question text, answers and topic tags. Filter by subject, sample year and difficulty.' },
        { icon: BookOpen, title: 'Think before you reveal', text: 'Try each question, reveal its sample explanation and compare it with your own reasoning.' },
        { icon: GraduationCap, title: 'Reflect on your understanding', text: 'Use a short self-assessment session to separate familiar topics from those you want to revisit.' }
      ].map(item => <Card key={item.title}><CardHeader><item.icon className="text-primary mb-2" aria-hidden="true" /><CardTitle className="text-lg">{item.title}</CardTitle></CardHeader><CardContent className="text-muted-foreground">{item.text}</CardContent></Card>)}</div></section>
      <section><h2 className="text-2xl font-bold mb-5">Choose a subject</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{subjects.map(subject => <Link className="flex items-center justify-between rounded-xl border p-5 hover:bg-muted focus-visible:outline focus-visible:outline-primary" key={subject} to={`/subject/${encodeURIComponent(subject)}`}><span>{subject}</span><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>)}</div></section>
    </main>
    <footer className="border-t py-8"><div className="container mx-auto px-4 flex flex-wrap gap-4 justify-between text-sm text-muted-foreground"><p>Smile Learning · React & TypeScript study prototype</p><a href="https://github.com/miikese/past-quest-solver" className="underline">Explore the source on GitHub</a></div></footer>
  </div>
);
export default HomePage;
