"use client";

import React, { useState, FormEvent } from "react";
import { Button, Link } from "@heroui/react";
import {
  CircleLetterG,
  Eye,
  EyeSlash,
  Envelope,
  Lock,
  Star,
} from "@gravity-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface SignInPageProps {
  redirectTo?: string;
}

export default function SignInPage({ redirectTo = "/" }: SignInPageProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "Invalid email or password!");
      } else {
        toast.success("Welcome back!");
        router.push(redirectTo);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#07070a] px-4 py-8">
      <Toaster position="top-center" />
      
      {/* কার্ড লেআউট ফিক্সড */}
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#0c0c12] p-8 shadow-2xl backdrop-blur-md">
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
            <Star className="text-white size-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-gray-400 mt-1">Enter your credentials to continue</p>
        </div>

        <Button
          variant="flat"
          className="w-full py-1 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20"
          startContent={<CircleLetterG className="size-5 text-red-500" />}
          onPress={() => signIn.social({ provider: "google", callbackURL: redirectTo })}
        >
          Continue with Google
        </Button>

        <div className="relative mb-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-[#0c0c12] px-3 text-xs text-gray-500 uppercase tracking-widest">or</span>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
            <div className="relative flex items-center">
              <Envelope className="absolute left-3 text-gray-500 size-5" />
              <input
                type="email"
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-white focus:border-blue-500 outline-none transition"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-500 size-5" />
              <input
                type={isVisible ? "text" : "password"}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 text-white focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 p-1 text-gray-500 hover:text-white"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full py-1 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-blue-400 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}