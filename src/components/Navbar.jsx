import Link from "next/link";
import { MessageSquare } from "lucide-react";
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 p-2 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center p-4 gap-2">
            <Link href={"/"} className="flex items-center"><MessageSquare className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold pl-2">Whisperly</span></Link>
          
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
          >
            How It Works
          </Link>
        </nav>
        <div className="flex items-center p-4 gap-4">
          <Link
            href="/sign-in"
            className="text-md font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link href={"/sign-up"} className="bg-purple-700 rounded-xl w-20 h-10 flex items-center justify-center hover:bg-purple-600 text-white">
          
              Sign up
            
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
