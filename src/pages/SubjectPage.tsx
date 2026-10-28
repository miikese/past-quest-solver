import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuestionCard } from '@/components/QuestionCard';
import { sampleQuestions } from '@/data/questions';

const SubjectPage = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const subjectQuestions = useMemo(() => {
    let questions = sampleQuestions.filter(q => 
      q.subject.toLowerCase() === subject?.toLowerCase()
    );

    if (selectedYear !== 'all') {
      questions = questions.filter(q => q.year.toString() === selectedYear);
    }

    if (selectedDifficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === selectedDifficulty);
    }

    return questions;
  }, [subject, selectedYear, selectedDifficulty]);

  const availableYears = useMemo(() => {
    const years = [...new Set(sampleQuestions
      .filter(q => q.subject.toLowerCase() === subject?.toLowerCase())
      .map(q => q.year)
    )].sort((a, b) => b - a);
    return years;
  }, [subject]);

  const getSubjectColor = (subjectName: string) => {
    const colors: { [key: string]: string } = {
      mathematics: 'bg-blue-500',
      physics: 'bg-purple-500',
      chemistry: 'bg-green-500',
      biology: 'bg-emerald-500',
      english: 'bg-red-500',
      history: 'bg-amber-500',
      'computer science': 'bg-indigo-500',
      economics: 'bg-orange-500',
      geography: 'bg-teal-500',
      psychology: 'bg-pink-500',
      'art history': 'bg-rose-500',
      'environmental science': 'bg-lime-500'
    };
    return colors[subjectName?.toLowerCase()] || 'bg-gray-500';
  };

  const difficultyStats = useMemo(() => {
    const allSubjectQuestions = sampleQuestions.filter(q => 
      q.subject.toLowerCase() === subject?.toLowerCase()
    );
    
    return {
      easy: allSubjectQuestions.filter(q => q.difficulty === 'easy').length,
      medium: allSubjectQuestions.filter(q => q.difficulty === 'medium').length,
      hard: allSubjectQuestions.filter(q => q.difficulty === 'hard').length,
      total: allSubjectQuestions.length
    };
  }, [subject]);

  const startSubjectQuiz = () => {
    // Navigate to quiz with subject filter
    navigate(`/quiz?subject=${encodeURIComponent(subject || "")}`);
  };

  if (!subject || !sampleQuestions.some(question => question.subject.toLowerCase() === subject.toLowerCase())) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Subject not found</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/questions')}
              className="shrink-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${getSubjectColor(subject)} rounded-lg flex items-center justify-center`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize">{subject}</h1>
                <p className="text-muted-foreground">
                  {difficultyStats.total} questions available
                </p>
              </div>
            </div>
          </div>

          <Button onClick={startSubjectQuiz} className="shrink-0">
            <Play className="mr-2 h-4 w-4" />
            Practice {subject}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{difficultyStats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Easy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{difficultyStats.easy}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{difficultyStats.medium}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{difficultyStats.hard}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Questions
            </CardTitle>
            <CardDescription>
              Narrow down questions by year and difficulty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger aria-label="Sample year">
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All years</SelectItem>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger aria-label="Difficulty">
                    <SelectValue placeholder="All difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(selectedYear !== 'all' || selectedDifficulty !== 'all') && (
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedYear('all');
                      setSelectedDifficulty('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {subjectQuestions.length} question{subjectQuestions.length !== 1 ? 's' : ''} found
          </h2>
        </div>

        {/* Questions Grid */}
        {subjectQuestions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to see more questions.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedYear('all');
                  setSelectedDifficulty('all');
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;