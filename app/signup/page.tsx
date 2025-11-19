"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authService } from "@/app/services/authservices";
import { SignUpFormData } from "@/app/types/auth";
import { useRouter } from "next/navigation";

type StrengthColor = "red" | "yellow" | "green";

interface PasswordStrengthState {
    level: number;
    text: string;
    color: StrengthColor;
}

const strengthColors: Record<StrengthColor, string> = {
    red: "bg-red-500 text-red-500",
    yellow: "bg-yellow-500 text-yellow-500",
    green: "bg-green-500 text-green-500",
};

const SignUp = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        username: "",
        name: "",
        password: "",
    });
    console.log(formData);

    const [emailError, setEmailError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthState>({
        level: 0,
        text: "",
        color: "red",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const calculatePasswordStrength = (password: string): void => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            setPasswordStrength({ level: 1, text: "Weak", color: "red" });
        } else if (strength <= 3) {
            setPasswordStrength({ level: 2, text: "Medium", color: "yellow" });
        } else {
            setPasswordStrength({ level: 3, text: "Strong", color: "green" });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as keyof SignUpFormData]: value }));
        setApiError("");
        setSuccessMessage("");

        if (name === "password") calculatePasswordStrength(value);
        if (name === "email") setEmailError("");
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!formData.email || !formData.username || !formData.password) {
            setApiError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setApiError("");
        setSuccessMessage("");
        setEmailError("");

        try {
            await authService.signUp(formData);

            setSuccessMessage("Account created successfully! Redirecting...");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: unknown) {
            console.error("Submission Error:", error);
            if (error instanceof Error) {
                setApiError(error.message || "Login failed. Please try again.");
            } else if (typeof error === "string") {
                setApiError(error || "Login failed. Please try again.");
            } else {
                setApiError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#101922] text-gray-800 dark:text-gray-200">
            <main className="w-full max-w-md space-y-8">
                <header className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <svg
                            className="w-10 h-10 text-blue-600"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Taskly</h1>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
                        Create Your Account
                    </h2>
                </header>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                            Email Address <span className="text-red-400 px-0.5">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                autoComplete="email"
                                className="block w-full rounded-lg border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-[#101922]/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600 sm:text-sm h-12 px-4 outline-none"
                                id="email"
                                name="email"
                                placeholder="your.name@example.com"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        {emailError && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{emailError}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">
                            Username <span className="text-red-400  px-0.5">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                autoComplete="username"
                                className="block w-full rounded-lg border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-[#101922]/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600 sm:text-sm h-12 px-4 outline-none"
                                id="username"
                                name="username"
                                placeholder="your_username"
                                type="text"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                autoComplete="name"
                                className="block w-full rounded-lg border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-[#101922]/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600 sm:text-sm h-12 px-4 outline-none"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                            Password <span className="text-red-400  px-0.5">*</span>
                        </label>
                        <div className="mt-1 relative">
                            <input
                                autoComplete="new-password"
                                className="block w-full rounded-lg border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-[#101922]/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600 sm:text-sm h-12 px-4 pr-10 outline-none"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
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
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Password must be at least 8 characters long.
                        </p>
                    </div>

                    {formData.password && (
                        <div className="space-y-2">
                            <div className="flex h-1.5 w-full space-x-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className={`h-full rounded-full transition-colors ${
                                        passwordStrength.level >= 1
                                            ? strengthColors[passwordStrength.color].split(" ")[0]
                                            : "bg-gray-200 dark:bg-gray-700"
                                    } w-1/3`}
                                ></div>
                                <div
                                    className={`h-full rounded-full transition-colors ${
                                        passwordStrength.level >= 2
                                            ? strengthColors[passwordStrength.color].split(" ")[0]
                                            : "bg-gray-200 dark:bg-gray-700"
                                    } w-1/3`}
                                ></div>
                                <div
                                    className={`h-full rounded-full transition-colors ${
                                        passwordStrength.level >= 3
                                            ? strengthColors[passwordStrength.color].split(" ")[0]
                                            : "bg-gray-200 dark:bg-gray-700"
                                    } w-1/3`}
                                ></div>
                            </div>
                            <p className={`text-sm font-medium ${strengthColors[passwordStrength.color].split(" ")[1]}`}>
                                {passwordStrength.text}
                            </p>
                        </div>
                    )}

                    <div>
                        <button
                            className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                            Log In
                        </Link>
                    </p>
                </div>

                <footer className="text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default SignUp;
