"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/app/services/authservices";

interface LoginFormData {
    email: string;
    password: string;
}

export default function TodoLogin() {
    const router = useRouter();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as keyof LoginFormData]: value }));
        setError("");
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please enter both username/email and password.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                identifier: formData.email,
                password: formData.password,
            };

            const response = await authService.login(payload);

            console.log("Login Successful");
              if (response.token) {
            localStorage.setItem("auth_token", response.token);
        }
            router.push("/dashboard");
        } catch (err: unknown) {
            console.error("Login failed", err);
            if (err instanceof Error) {
                setError(err.message || "Login failed. Please try again.");
            } else if (typeof err === "string") {
                setError(err || "Login failed. Please try again.");
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 dark:bg-[#101922] p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex items-center gap-3">
                        <svg
                            className="w-10 h-10 text-blue-600"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back!</h1>
                    <p className="text-slate-600 dark:text-slate-400">Log in to continue to your dashboard.</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message Alert */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 pb-2">
                                Username or Email
                            </label>
                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 pl-10 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 outline-none disabled:opacity-50"
                                    placeholder="you@example.com"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 pb-2">
                                Password
                            </label>
                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 outline-none disabled:opacity-50"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                    disabled={loading}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showPassword ? (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            />
                                        ) : (
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full cursor-pointer items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors ${
                                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
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
                                    Logging In...
                                </div>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                    {"Don't have an account?"}{" "}
                    <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
