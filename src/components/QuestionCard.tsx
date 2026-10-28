import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Calendar, BookOpen, Target } from "lucide-react";
import { useState } from "react";
import { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  hard: "bg-red-100 text-red-800 border-red-200"
};

export const QuestionCard = ({ question }: QuestionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-question hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-medium">
            <BookOpen className="w-3 h-3 mr-1" />
            {question.subject}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {question.year}
            </Badge>
            <Badge 
              variant="outline" 
              className={`text-xs ${difficultyColors[question.difficulty]}`}
            >
              <Target className="w-3 h-3 mr-1" />
              {question.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground leading-relaxed">
          {question.questionText}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-3 h-auto text-left hover:bg-secondary/50 transition-colors"
            >
              <span className="font-medium text-primary">
                {isOpen ? "Hide explanation" : "Show explanation"}
              </span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-primary" />
              ) : (
                <ChevronDown className="h-4 w-4 text-primary" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-accent-foreground mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2 text-accent" />
                Sample explanation:
              </h4>
              <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                {question.answerText}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};