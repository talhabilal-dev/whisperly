import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Star,
  Lock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-bg py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 mb-4">
                Honest Feedback, Anonymous Delivery
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter gradient-text max-w-3xl">
                Grow Through Anonymous Feedback
              </h1>
              <p className="text-zinc-400 md:text-xl max-w-[700px] mx-auto">
                Whisperly provides a safe space for honest communication.
                Receive constructive feedback anonymously and use it to improve
                personally and professionally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-6 text-lg">
                  Create Your Page
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-6 text-lg"
                >
                  See Demo
                </Button>
              </div>
            </div>
            <div className="relative mx-auto mt-16 max-w-4xl">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-900 to-zinc-700 opacity-30 blur-lg"></div>
              <div className="relative rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-2xl">
                <div className="rounded-md bg-zinc-950 p-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-zinc-500">
                      whisperly.app/feedback/jane-doe
                    </div>
                  </div>
                  <div className="mt-4 space-y-4 p-2">
                    <div className="rounded-lg bg-zinc-800 p-4">
                      <p className="text-sm text-zinc-300">
                        Your presentation skills are impressive, but I think you
                        could improve by adding more concrete examples to
                        support your points.
                      </p>
                      <div className="mt-2 text-xs text-zinc-500">
                        Anonymous • 2 days ago
                      </div>
                    </div>
                    <div className="rounded-lg bg-zinc-800 p-4">
                      <p className="text-sm text-zinc-300">
                        I appreciate how you handled the client meeting
                        yesterday. Your patience and clear explanations really
                        helped move the project forward.
                      </p>
                      <div className="mt-2 text-xs text-zinc-500">
                        Anonymous • 1 day ago
                      </div>
                    </div>
                    <div className="rounded-lg bg-purple-900/30 border border-purple-800/50 p-4">
                      <p className="text-sm text-zinc-300">
                        What's one thing I could do better as a team leader?
                      </p>
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your anonymous feedback..."
                          className="flex-1 rounded-md bg-zinc-950 px-3 py-2 text-sm text-zinc-300 border border-zinc-800 focus:border-purple-700 focus:outline-none"
                        />
                        <Button
                          size="sm"
                          className="bg-purple-700 hover:bg-purple-600"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 mb-4">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter gradient-text">
                Everything You Need for Honest Feedback
              </h2>
              <p className="text-zinc-400 md:text-lg max-w-[700px] mx-auto">
                Whisperly provides all the tools you need to collect, manage,
                and learn from anonymous feedback.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Complete Anonymity</h3>
                  <p className="text-zinc-400">
                    We never store identifying information about feedback
                    providers, ensuring true anonymity.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Custom Feedback Pages
                  </h3>
                  <p className="text-zinc-400">
                    Create personalized feedback pages with custom questions to
                    get the insights you need.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <Zap className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Instant Notifications
                  </h3>
                  <p className="text-zinc-400">
                    Get notified immediately when someone leaves you feedback so
                    you can review it right away.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <Lock className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Content Moderation</h3>
                  <p className="text-zinc-400">
                    Our AI filters help prevent harmful content while preserving
                    honest feedback.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <MessageSquare className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Response Options</h3>
                  <p className="text-zinc-400">
                    Choose to respond publicly or privately to feedback without
                    compromising anonymity.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 shadow-lg hover:shadow-purple-900/10 transition-all">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Insights Dashboard</h3>
                  <p className="text-zinc-400">
                    Track patterns and trends in your feedback with our powerful
                    analytics dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 mb-4">
                Simple Process
              </div>
              <h2 className="text-3xl font-bold tracking-tighter gradient-text">
                How Whisperly Works
              </h2>
              <p className="text-zinc-400 md:text-lg max-w-[700px] mx-auto">
                Getting started with Whisperly is easy. Follow these simple
                steps to begin receiving valuable anonymous feedback.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  <Users className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Page</h3>
                <p className="text-zinc-400">
                  Sign up and create your personalized feedback page in less
                  than a minute.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  <MessageSquare className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Share Your Link</h3>
                <p className="text-zinc-400">
                  Share your unique feedback link with colleagues, friends, or
                  your audience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                  <Zap className="h-10 w-10 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Receive Feedback</h3>
                <p className="text-zinc-400">
                  Get notified when you receive anonymous feedback and use it to
                  grow.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Button className="bg-purple-700 hover:bg-purple-600 text-white">
                Create Your Page Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
      </main>
    </div>
  );
}
