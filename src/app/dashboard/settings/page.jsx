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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Would normally show a toast notification here

      toast.success("Settings saved successfully!", {
        duration: 3000,
        description: "Your changes have been saved.",
        action: {
          label: "Ok",
          onClick: () => {
            // Undo action logic here
          },
        },
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-zinc-400">Manage your account preferences</p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription className="text-zinc-400">
            Update your account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                defaultValue="Jane"
                className="border-zinc-700 bg-zinc-800 text-white focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                defaultValue="Doe"
                className="border-zinc-700 bg-zinc-800 text-white focus-visible:ring-purple-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="jane.doe@example.com"
              className="border-zinc-700 bg-zinc-800 text-white focus-visible:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center">
              <span className="bg-zinc-800 border border-r-0 border-zinc-700 px-3 py-2 text-sm text-zinc-400 rounded-l-md">
                whisperly.app/feedback/
              </span>
              <Input
                id="username"
                defaultValue="jane-doe"
                className="border-zinc-700 bg-zinc-800 text-white focus-visible:ring-purple-500 rounded-l-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 flex justify-end">
          <Button
            className="bg-purple-700 hover:bg-purple-600"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription className="text-zinc-400">
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <p className="text-sm text-zinc-400">
                Receive email notifications when you get new feedback
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
          <Separator className="bg-zinc-800" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="message-preview">Message preview</Label>
              <p className="text-sm text-zinc-400">
                Show message content in notifications
              </p>
            </div>
            <Switch
              id="message-preview"
              checked={messagePreview}
              onCheckedChange={setMessagePreview}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-800 flex justify-end">
          <Button
            className="bg-purple-700 hover:bg-purple-600"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription className="text-zinc-400">
            Irreversible account actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border border-red-900/50 bg-red-900/10 p-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-red-400">Delete account</h3>
              <p className="text-sm text-zinc-400">
                Once you delete your account, there is no going back. All of
                your data will be permanently removed.
              </p>
              <div className="mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-28 bg-red-700 hover:bg-red-600 cursor-pointer"
                    >
                      Delete account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
