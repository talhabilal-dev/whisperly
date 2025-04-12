"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock AI-generated questions based on different categories
const aiQuestions = {
  professional: [
    "What's one skill you think I should develop further in my professional life?",
    "How could I improve my communication style in team meetings?",
    "What do you think is my biggest blind spot in my work approach?",
    "How could I be more effective as a team member or leader?",
    "What's one thing I could do to make our collaboration more productive?",
  ],
  personal: [
    "What's one quality about me that you appreciate the most?",
    "How could I be a better listener in our conversations?",
    "What's one habit you think I should consider changing?",
    "In what ways could I improve how I handle difficult conversations?",
    "What's something you wish I would do more often in our interactions?",
  ],
  growth: [
    "What's one area where you've seen me grow the most recently?",
    "What opportunity for growth do you think I might be missing?",
    "How could I better leverage my strengths in my daily life?",
    "What's one challenge you think would help me develop further?",
    "What skill do you think I should focus on developing next?",
  ],
};

export default function FeedbackPage({ params }) {
  const { username } = params;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("direct");

  // AI question generation states
  const [selectedCategory, setSelectedCategory] = useState("professional");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // This would normally come from an API call based on the username
  const userData = {
    displayName: "Jane Doe",
    profileImage: null, // We'll use a placeholder
    isAcceptingMessages: true,
    customQuestion: "What's one thing I could improve on?",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    if (message.length < 10) {
      setError("Message is too short. Please provide more detailed feedback.");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestions = async () => {
    setIsGeneratingQuestions(true);
    setGeneratedQuestions([]);

    // Simulate API call to generate questions
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // In a real app, this would be an API call to an AI service
      // For now, we'll use our mock data based on the selected category
      const questions = aiQuestions[selectedCategory];

      // Randomly select 3 questions from the category
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setGeneratedQuestions(shuffled.slice(0, 3));
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const selectQuestion = (question) => {
    setSelectedQuestion(question);
    setMessage(question);
    setActiveTab("direct"); // Switch back to the direct tab after selecting
  };

  if (!userData.isAcceptingMessages) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold text-white">Whisperly</span>
        </Link>

        <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {userData.displayName}
            </CardTitle>
            <CardDescription className="text-zinc-400 text-center">
              This user is not accepting feedback at the moment
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-16 w-16 text-zinc-600 mb-4" />
            <p className="text-center text-zinc-400">
              {userData.displayName} has temporarily disabled anonymous
              messages. Please check back later.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-purple-700 hover:bg-purple-600">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold text-white">Whisperly</span>
        </Link>

        <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Message Sent!
            </CardTitle>
            <CardDescription className="text-zinc-400 text-center">
              Your anonymous feedback has been delivered
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-center text-zinc-300 mb-4">
              Thank you for your feedback! {userData.displayName} will receive
              your message anonymously.
            </p>
            <p className="text-center text-zinc-400 text-sm">
              Your identity has been kept completely anonymous.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={() => {
                setMessage("");
                setIsSubmitted(false);
                setSelectedQuestion(null);
              }}
              className="w-full bg-purple-700 hover:bg-purple-600"
            >
              Send Another Message
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-purple-500" />
        <span className="text-xl font-bold text-white">Whisperly</span>
      </Link>

      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 text-white">
        <CardHeader className="space-y-1">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-purple-700 flex items-center justify-center mb-4">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage || "/placeholder.svg"}
                  alt={userData.displayName}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold">
                  {userData.displayName.charAt(0)}
                </span>
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {userData.displayName}
            </CardTitle>
            <CardDescription className="text-zinc-400 text-center">
              Send anonymous feedback
            </CardDescription>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger
                value="direct"
                className="data-[state=active]:bg-purple-700"
              >
                Direct Feedback
              </TabsTrigger>
              <TabsTrigger
                value="ai-assisted"
                className="data-[state=active]:bg-purple-700"
              >
                AI-Assisted
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="direct" className="mt-0">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-900/20 border-red-900 text-red-400"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {selectedQuestion || userData.customQuestion}
                  </h3>
                  <Textarea
                    placeholder="Type your anonymous message here..."
                    className="min-h-[150px] border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="text-xs text-zinc-400">
                    Your feedback will be completely anonymous. We don't store
                    any identifying information.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Anonymous Feedback
                    </span>
                  )}
                </Button>
                <div className="text-center text-xs text-zinc-500">
                  By sending feedback, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="ai-assisted" className="mt-0">
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-medium">AI Question Generator</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  Not sure what to ask? Let our AI suggest thoughtful questions
                  for giving feedback.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-zinc-700 hover:bg-zinc-800 ${
                        selectedCategory === "professional"
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400"
                      }`}
                      onClick={() => setSelectedCategory("professional")}
                    >
                      Professional
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-zinc-700 hover:bg-zinc-800 ${
                        selectedCategory === "personal"
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400"
                      }`}
                      onClick={() => setSelectedCategory("personal")}
                    >
                      Personal
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-zinc-700 hover:bg-zinc-800 ${
                        selectedCategory === "growth"
                          ? "bg-zinc-800 text-white"
                          : "text-zinc-400"
                      }`}
                      onClick={() => setSelectedCategory("growth")}
                    >
                      Growth & Development
                    </Button>
                  </div>

                  <Button
                    onClick={generateQuestions}
                    disabled={isGeneratingQuestions}
                    className="w-full bg-purple-700 hover:bg-purple-600"
                  >
                    {isGeneratingQuestions ? (
                      <span className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating questions...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Questions
                      </span>
                    )}
                  </Button>
                </div>

                {generatedQuestions.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="font-medium text-zinc-300">
                      Suggested Questions:
                    </h4>
                    <div className="space-y-2">
                      {generatedQuestions.map((question, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-md border border-zinc-700 bg-zinc-800 hover:border-purple-600 cursor-pointer transition-colors"
                          onClick={() => selectQuestion(question)}
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-zinc-300">{question}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-transparent"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectQuestion(question);
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">Use this question</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="mt-8 text-center text-sm text-zinc-500">
        <p>Want to receive anonymous feedback too?</p>
        <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
          Create your own Whisperly page
        </Link>
      </div>
    </div>
  );
}
