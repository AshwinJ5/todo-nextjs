"use client";
import React, { useState } from "react";
import Link from "next/link";

interface SignUpFormData {
    email: string;
    username: string;
    name: string;
    password: string;
}

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
    const [formData, setFormData] = useState<SignUpFormData>({
        email: "",
        username: "",
        name: "",
        password: "",
    });

    const [emailError, setEmailError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthState>({
        level: 0,
        text: "",
        color: "red",
    });

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

        if (name === "password") {
            calculatePasswordStrength(value);
        }
        if (name === "email") {
            setEmailError("");
        }
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (formData.email === "test@example.com") {
            setEmailError("Email is already in use.");
            return;
        }

        console.log("Form submitted:", formData);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#101922] text-gray-800 dark:text-gray-200">
            <main className="w-full max-w-md space-y-8">
                <header className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-3">
                        <svg
                            className="w-8 h-8 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"></path>
                            <path
                                clipRule="evenodd"
                                d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TaskFlow</h1>
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white">
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
                        <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
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
