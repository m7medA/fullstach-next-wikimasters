"use client";

import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { signUpUser } from "@/app/actions/users";
import { redirect } from "next/navigation";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 6) {
      setError("Check password field.");
      return;
    }

    const data = {
      name,
      email,
      hashedPassword: password,
    };

    const result = await signUpUser(data);

    if (result) redirect("/");
  };

  return (
    <div className="bg-white w-[40%] dark:bg-gray-800 min-w-[420px] shadow-2xl rounded-2xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
        Create Account
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
        Get started with us today!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent transition"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MailIcon className="h-5 w-5 text-gray-400" />
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
            htmlFor="password-signup"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="password-signup"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-transparent rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent transition"
              placeholder="Create a password"
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
