"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, MoreVertical, ThumbsUp, Filter, Share2 } from "lucide-react";


// Mock data for messages
const messages = [
  {
    id: 1,
    content:
      "Your presentation skills are impressive, but I think you could improve by adding more concrete examples to support your points.",
    date: "2 days ago",
    isRead: true,
  },
  {
    id: 2,
    content:
      "I appreciate how you handled the client meeting yesterday. Your patience and clear explanations really helped move the project forward.",
    date: "1 day ago",
    isRead: true,
  },
  {
    id: 3,
    content:
      "Just wanted to say that your work on the latest project was outstanding. The attention to detail really shows.",
    date: "5 hours ago",
    isRead: false,
  },
  {
    id: 4,
    content:
      "I think you could be more assertive in team meetings. Your ideas are good but sometimes you don't speak up enough.",
    date: "3 hours ago",
    isRead: false,
  },
  {
    id: 5,
    content:
      "The way you mentored the new team member was really helpful. You have a talent for explaining complex concepts in simple terms.",
    date: "1 hour ago",
    isRead: false,
  },
];

export default function Dashboard() {
  const [acceptingMessages, setAcceptingMessages] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Filter messages based on active tab
  const filteredMessages = messages.filter((message) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !message.isRead;
    return true;
  });

  // Sort messages based on sort order (simplified for demo)
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortOrder === "newest") return b.id - a.id;
    return a.id - b.id;
  });

  const copyFeedbackLink = () => {
    navigator.clipboard.writeText("https://whisperly.app/feedback/jane-doe");
    // Would normally show a toast notification here
    alert("Feedback link copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400">Manage your feedback and messages</p>
        </div>
        <Button
          onClick={copyFeedbackLink}
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy feedback link
        </Button>
      </div>

      {/* Message acceptance toggle */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Message Settings</CardTitle>
          <CardDescription className="text-zinc-400">
            Control whether you're accepting anonymous messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Accept anonymous messages</h3>
                <Badge
                  variant={acceptingMessages ? "default" : "secondary"}
                  className={acceptingMessages ? "bg-green-600" : "bg-zinc-700"}
                >
                  {acceptingMessages ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-zinc-400">
                {acceptingMessages
                  ? "You are currently accepting anonymous messages."
                  : "You are not accepting anonymous messages at this time."}
              </p>
            </div>
            <Switch
              checked={acceptingMessages}
              onCheckedChange={setAcceptingMessages}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-sm text-zinc-400">
            Your personal feedback link:{" "}
            <span className="font-mono text-zinc-300">
              whisperly.app/feedback/jane-doe
            </span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="bg-purple-700 hover:bg-purple-600">
              Customize
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Messages list */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Your Messages</CardTitle>
              <CardDescription className="text-zinc-400">
                You have received {messages.length} messages
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[140px] border-zinc-700 bg-zinc-800 text-white focus:ring-purple-500">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs
            defaultValue="all"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-700"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="data-[state=active]:bg-purple-700"
              >
                Unread
                <Badge className="ml-2 bg-purple-600">
                  {messages.filter((m) => !m.isRead).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedMessages.length > 0 ? (
              sortedMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border ${
                    !message.isRead
                      ? "bg-zinc-800/30 border-purple-600"
                      : "border-zinc-800"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>Anonymous</span>
                        <span>•</span>
                        <span>{message.date}</span>
                        {!message.isRead && (
                          <Badge className="bg-purple-600 text-[10px]">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
                          onClick={() => {
                            // This would normally call an API to delete the message
                            alert(`Message ${message.id} would be deleted`);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="border-zinc-700 bg-zinc-800 text-white"
                          >
                            <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">
                              <ThumbsUp className="mr-2 h-4 w-4" />
                              <span>Thank sender</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-zinc-700 cursor-pointer">
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy message</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-zinc-300 flex-grow">{message.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-8 text-center">
                <p className="text-zinc-400">No messages found</p>
              </div>
            )}
          </div>
        </CardContent>
        {sortedMessages.length > 0 && (
          <CardFooter className="border-t border-zinc-800 p-4">
            <div className="w-full flex justify-center">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Load more
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
