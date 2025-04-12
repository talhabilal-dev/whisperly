import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, MessageSquare, Settings, User } from "lucide-react";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "message",
    content: "You received a new anonymous message",
    time: "5 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    type: "system",
    content: "Your account was successfully verified",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 3,
    type: "message",
    content: "You received a new anonymous message",
    time: "1 day ago",
    isRead: false,
  },
  {
    id: 4,
    type: "system",
    content: "Welcome to Whisperly! Complete your profile to get started",
    time: "2 days ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center overflow-hidden justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-zinc-400">
            Stay updated with your account activity
          </p>
        </div>
        <Button
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          Mark all as read
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription className="text-zinc-400">
            You have {notifications.filter((n) => !n.isRead).length} unread
            notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-800">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex items-start gap-4 ${
                  !notification.isRead ? "bg-zinc-800/30" : ""
                }`}
              >
                <div
                  className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    notification.type === "message"
                      ? "bg-purple-900/50"
                      : "bg-zinc-800"
                  }`}
                >
                  {notification.type === "message" ? (
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                  ) : notification.type === "system" ? (
                    <Bell className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <User className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-zinc-200">
                      {notification.content}
                    </p>
                    {!notification.isRead && (
                      <Badge className="bg-purple-600">New</Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
