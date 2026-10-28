import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { SearchBar } from "@/components/SearchBar";
import { sampleQuestions } from "@/data/questions";
import { GraduationCap, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredQuestions = useMemo(() => {
    return sampleQuestions.filter((question) => {
      const matchesSearch = 
        question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answerText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSubject = selectedSubject === "All" || question.subject === selectedSubject;
      const matchesYear = selectedYear === "All" || question.year.toString() === selectedYear;
      const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesSubject && matchesYear && matchesDifficulty;
    });
  }, [searchTerm, selectedSubject, selectedYear, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              asChild
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              <span className="font-bold text-lg">Smile Learning</span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Past Questions & Answers
            </h1>
            <p className="text-lg text-white/90">
              Explore sample questions and explanations. Check important answers against your course materials.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Search and Filters */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {filteredQuestions.length === 0 ? "No questions found" : 
             filteredQuestions.length === 1 ? "1 Question Found" :
             `${filteredQuestions.length} Questions Found`}
          </h2>
          
          {(searchTerm || selectedSubject !== "All" || selectedYear !== "All" || selectedDifficulty !== "All") && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedSubject("All");
                setSelectedYear("All");
                setSelectedDifficulty("All");
              }}
              className="text-primary border-primary hover:bg-primary hover:text-white transition-smooth"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-muted/50 rounded-2xl inline-block mb-4">
              <Search className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default QuestionsPage;