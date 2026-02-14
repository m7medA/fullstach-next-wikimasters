"use client";

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon, MailsIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (!result?.ok) {
      setError("Invalid email or password");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 container mx-auto min-w-[400px] w-[40%] shadow-2xl rounded-2xl p-6 sm:p-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Welcome Back to{" "}
          <span className="fonet-bold text-3xl tracking-tight text-gray-900">
            Wikimasters
          </span>
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Sign in to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MailsIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent transition"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-bold mt-2 text-center ">
            {error}
          </p>
        )}

        <div className="flex justify-center mt-10">
          <Button type="submit" className="w-40 text-md cursor-pointer">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
