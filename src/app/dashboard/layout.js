"use client";
import Link from "next/link";
import { MessageSquare, User, Settings, LogOut, Bell } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 p-4">
              <MessageSquare className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">Whisperly</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 p-4">
            <Link href="/dashboard/notifications" className="relative">
              <Bell className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px]">
                3
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium hidden sm:inline-block">
                Jane Doe
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container flex flex-1 gap-8 py-8">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <nav className="sticky top-24 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-200 bg-zinc-900 border-l-2 border-purple-600"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            {/* <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 hover:text-white transition-colors"
            > */}
            <LogOut className="h-5 w-5" />

            <Button
              onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
              variant="outline"
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              Sign Out
            </Button>
            {/* </Link> */}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
