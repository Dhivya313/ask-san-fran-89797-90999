import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Aurora from "@/components/Aurora";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Landing = () => {
  const ctaRef = useRef<HTMLElement>(null);

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 h-[60vh] pointer-events-none">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">RAG System</span>
            </div>
            <Link to="/app">
              <Button variant="outline" className="rounded-xl border-border/50 hover:bg-accent/50">
                Launch App
              </Button>
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Powered by Advanced AI</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Retrieval-Augmented
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Generation System
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ask questions and get contextual answers powered by intelligent information retrieval
              and generative AI
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={scrollToCTA}
                className="px-8 py-6 rounded-xl text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-apple-lg hover:shadow-apple-lg transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToCTA}
                className="px-8 py-6 rounded-xl text-lg font-medium border-border/50 hover:bg-accent/50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Why Choose Our RAG System
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card glass-effect shadow-apple-lg rounded-2xl p-8 border-0 space-y-4 group hover:shadow-apple-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Intelligent Retrieval
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced algorithms find the most relevant context from your knowledge base
                </p>
              </div>

              <div className="glass-card glass-effect shadow-apple-lg rounded-2xl p-8 border-0 space-y-4 group hover:shadow-apple-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Lightning Fast
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get answers in seconds with optimized performance and caching
                </p>
              </div>

              <div className="glass-card glass-effect shadow-apple-lg rounded-2xl p-8 border-0 space-y-4 group hover:shadow-apple-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Contextual Answers
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive responses that combine retrieved information with AI generation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card glass-effect shadow-apple-lg rounded-2xl p-12 border-0 text-center space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Experience RAG?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start asking questions and discover the power of retrieval-augmented generation
                </p>
                <Link to="/app">
                  <Button
                    size="lg"
                    className="px-8 py-6 rounded-xl text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-apple-lg hover:shadow-apple-lg transition-all duration-300"
                  >
                    Launch Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 RAG System. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
