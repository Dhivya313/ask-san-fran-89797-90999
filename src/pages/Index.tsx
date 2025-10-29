import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, ChevronUp, ChevronDown, Home, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { Link } from "react-router-dom"; // This component requires a Router context which is missing.
import { useTheme } from "next-themes";

interface RAGResponse {
  answer: string;
  contexts: string[];
}

// Define the API endpoint
const API_URL = "https://pectous-unrepugnantly-skylar.ngrok-free.dev/query";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<RAGResponse | null>(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleGenerate = async () => {
    if (!question.trim()) {
      toast({
        title: "Question required",
        description: "Please enter a question to generate an answer.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null); // Clear previous response

    try {
      // This is the actual API call
      const apiResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          query: question,
          top_k: topK,
        }),
      });

      if (!apiResponse.ok) {
        // Handle HTTP errors (e.g., 500, 503)
        const errorData = await apiResponse.json();
        throw new Error(errorData.detail || `HTTP error! status: ${apiResponse.status}`);
      }

      const data: RAGResponse = await apiResponse.json();

      setResponse(data);
      toast({
        title: "Answer generated",
        description: "Successfully retrieved contexts and generated answer.",
      });

    } catch (error) {
      console.error("Failed to generate answer:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate answer. Check console or API logs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const incrementTopK = () => setTopK(prev => Math.min(prev + 1, 10));
  const decrementTopK = () => setTopK(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            {/* FIX: Replaced react-router-dom's <Link> with a standard <a> tag.
              The <Link> component was causing a crash because it was not 
              wrapped in a <BrowserRouter> context.
            */}
            <a href="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Home className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                RAG Testing
              </span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mt-4">
              Ask questions and retrieve contextual answers
            </p>
          </div>
        </div>

        {/* Input Card */}
        <Card className="glass-card glass-effect shadow-apple-lg rounded-2xl p-8 space-y-6 border-0 transition-all duration-300 hover:shadow-apple-lg">
          <div className="space-y-3">
            <Label htmlFor="question" className="text-lg font-semibold text-foreground">
              Ask a question
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px] resize-none rounded-xl border-border/50 bg-input/50 backdrop-blur-sm text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-3">
              <Label htmlFor="topk" className="text-lg font-semibold text-foreground">
                Top K contexts
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="topk"
                  type="number"
                  value={topK}
                  onChange={(e) => setTopK(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="w-20 text-center rounded-xl border-border/50 bg-input/50 backdrop-blur-sm transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  disabled={isLoading}
                  min={1}
                  max={10}
                />
                <div className="flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg border-border/50 hover:bg-accent/50 hover:border-primary/50 transition-all duration-200"
                    onClick={incrementTopK}
                    disabled={isLoading || topK >= 10}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg border-border/50 hover:bg-accent/50 hover:border-primary/50 transition-all duration-200"
                    onClick={decrementTopK}
                    disabled={isLoading || topK <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !question.trim()}
              className="px-8 py-6 rounded-xl text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-apple-md hover:shadow-apple-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Answer
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {/* This section will now be populated by the API response */}
        {response && (
          <div className="space-y-6 animate-slide-up">
            {/* Generated Answer */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                <Sparkles className="h-7 w-7 text-primary" />
                Generated Answer
              </h2>
              <Card className="glass-card glass-effect shadow-apple-lg rounded-2xl p-8 border-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="relative">
                  <p className="text-foreground/90 leading-relaxed text-lg">
                    {response.answer}
                  </p>
                </div>
              </Card>
            </div>

            {/* Retrieved Contexts */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Retrieved Contexts
              </h2>
              <div className="space-y-4">
                {response.contexts.map((context, index) => (
                  <Card
                    key={index}
                    className="glass-card glass-effect shadow-apple-md rounded-xl p-6 border-0 hover:shadow-apple-lg transition-all duration-300 animate-spring-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-base font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-foreground/80 leading-relaxed text-base flex-1">
                        {context}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
