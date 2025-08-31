
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { codeChallenge, type CodeChallengeOutput } from '@/ai/flows/code-challenge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Code, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const topics = [
  "JavaScript Closures",
  "React Hooks",
  "CSS Flexbox",
  "Python List Comprehension",
  "TypeScript Interfaces vs Types"
];

type GameState = 'loading' | 'playing' | 'answered';

export default function AiQuizPage() {
  const [challenge, setChallenge] = useState<CodeChallengeOutput | null>(null);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [gameState, setGameState] = useState<GameState>('loading');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const fetchChallenge = async () => {
    setGameState('loading');
    setChallenge(null);
    setSelectedAnswer(null);

    try {
      const result = await codeChallenge({ topic: selectedTopic });
      setChallenge(result);
      setGameState('playing');
    } catch (error) {
      console.error("Lỗi khi lấy thử thách code:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải thử thách mới. Vui lòng thử lại.",
        variant: "destructive"
      });
      setGameState('playing'); // Allow retry
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, [selectedTopic]);

  const handleAnswerSubmit = (answer: string) => {
    if (gameState !== 'playing') return;
    setSelectedAnswer(answer);
    setGameState('answered');

    if (answer === challenge?.correctAnswer) {
      setScore(s => s + 10);
      toast({
        title: "Chính xác!",
        description: "+10 điểm!",
        className: "bg-green-500 text-white border-green-500"
      });
    } else {
      toast({
        title: "Không chính xác!",
        description: `Đáp án đúng là: ${challenge?.correctAnswer}`,
        variant: "destructive"
      });
    }
  };

  const renderChoices = () => {
    if (!challenge) return null;
    
    return challenge.choices.map((choice) => {
        const isSelected = selectedAnswer === choice;
        const isCorrect = challenge.correctAnswer === choice;

        return (
            <Button
                key={choice}
                variant="outline"
                className={cn(
                    "w-full justify-start text-left h-auto py-3",
                    gameState === 'answered' && isCorrect && "bg-green-500/20 border-green-500 hover:bg-green-500/30",
                    gameState === 'answered' && isSelected && !isCorrect && "bg-red-500/20 border-red-500 hover:bg-red-500/30"
                )}
                onClick={() => handleAnswerSubmit(choice)}
                disabled={gameState !== 'playing'}
            >
                {choice}
            </Button>
        )
    })
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          AI Code Quiz
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Thử thách kiến thức của bạn! AI sẽ tạo một đoạn code và câu hỏi.
        </p>
      </div>
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
             <div className="flex justify-between items-center mb-4">
                <Select value={selectedTopic} onValueChange={setSelectedTopic} disabled={gameState === 'loading'}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Chọn một chủ đề" />
                    </SelectTrigger>
                    <SelectContent>
                        {topics.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <div className="text-lg font-bold">Điểm: <span className="text-primary">{score}</span></div>
                <Button onClick={fetchChallenge} disabled={gameState === 'loading'}>
                    <RefreshCw className={cn("mr-2", gameState === 'loading' && "animate-spin")} />
                    Thử thách mới
                </Button>
            </div>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Lightbulb className="text-primary glow-primary" />
              Câu hỏi
            </CardTitle>
            {gameState === 'loading' ? (
                <Skeleton className="h-6 w-3/4 mt-2" />
            ) : (
                <CardDescription className="text-lg pt-2">{challenge?.question}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 font-semibold text-muted-foreground flex items-center gap-2">
                <Code />
                Đoạn Code
              </h3>
              <div className="p-4 rounded-md bg-secondary text-secondary-foreground overflow-x-auto">
                {gameState === 'loading' ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
                         <Skeleton className="h-4 w-1/2" />
                    </div>
                ) : (
                    <pre className="whitespace-pre-wrap"><code className="font-code text-sm">{challenge?.codeSnippet}</code></pre>
                )}
              </div>
            </div>
            <div className="space-y-3">
                {gameState === 'loading' ? (
                    Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
                ) : (
                    renderChoices()
                )}
            </div>
            {gameState === 'answered' && challenge?.explanation && (
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Giải thích</AlertTitle>
                    <AlertDescription>
                        {challenge.explanation}
                    </AlertDescription>
                </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
