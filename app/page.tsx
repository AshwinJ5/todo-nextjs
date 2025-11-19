import Link from "next/link";

const features = [
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        title: "Task Management",
        description:
            "Easily create, organize, and prioritize your tasks. Set due dates and reminders to never miss a deadline.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
        ),
        title: "Custom Views",
        description:
            "Switch between list, board, and calendar views to visualize your workflow in a way that works for you.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        title: "Cross-Device Sync",
        description: "Access your tasks from anywhere. Your data is always in sync across all your devices.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
        ),
        title: "Smart Reminders",
        description: "Get intelligent reminders for your most important tasks, so you can focus on what's next.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
        ),
        title: "Projects & Labels",
        description: "Group related tasks into projects and use labels to categorize your work for better organization.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
        ),
        title: "Team Collaboration",
        description: "Share projects, assign tasks, and add comments. Work seamlessly with your team in one place.",
    },
];

export default function Home() {
    return (
        <div className="relative w-full flex flex-col min-h-screen bg-slate-50 dark:bg-[#101922] text-slate-800 dark:text-slate-200">
            <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-[#101922]/80 backdrop-blur-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 text-blue-600">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Clarity</h2>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <Link href="#features" className="hover:text-blue-600 transition-colors">
                                Features
                            </Link>
                            <Link href="#pricing" className="hover:text-blue-600 transition-colors">
                                Pricing
                            </Link>
                            <Link href="#" className="hover:text-blue-600 transition-colors">
                                Blog
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link href={'/login'} className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-blue-600 text-white text-sm font-bold leading-normal hover:bg-blue-700 transition-colors">
                                <span className="truncate">Sign In</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="grow">
                <section className="py-20 sm:py-28">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 dark:text-white leading-tight">
                            Achieve focus. Find your <span className="text-blue-600">Clarity</span>.
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
                            The simple yet powerful to-do list that helps you organize your work and life. Stop feeling
                            overwhelmed and start getting things done.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={'/signup'} className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold leading-normal hover:bg-blue-700 transition-colors">
                                <span className="truncate">Get Started for Free</span>
                            </Link>
                        </div>

                        <div className="mt-20 max-w-4xl mx-auto">
                            <div
                                className="w-full aspect-video rounded-xl shadow-2xl dark:shadow-blue-600/20 bg-center bg-no-repeat bg-cover border border-slate-200 dark:border-slate-800"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOstMgyAdd1V8CzH5RPWXdcTKA-DcSKPPKYTQQwTgt7gJCFHGOQKg4B2VXdN9ev-Ulzg1SMHsUrlfBQfX3bQg8RGymQqbtyR9yEJ9Ydwd7L-Z4VuO3TmXZtnN0q0phYvE25S3Tnv_yYA96SSbBdHGFuE8-CPmMVlK53PGAZcSeE13p99YlV_93zwIciqhr9KOcW1wFPLeFA3wICinEQgXKfA5h_AqXisS1NO4I8LfTOy9SJxYdWRPnmF3f-Sy6YvyH4b2IxIWD5DI')",
                                }}
                                role="img"
                                aria-label="Screenshot of the Clarity to-do app interface"
                            ></div>
                        </div>
                    </div>
                </section>

                <section className="py-20 sm:py-28 bg-white dark:bg-[#1c2127]" id="features">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Everything you need to get organized
                            </h2>
                            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                                Clarity is packed with features designed to improve your productivity and bring peace of
                                mind.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 rounded-xl p-6 bg-slate-50 dark:bg-[#101922] border border-slate-200 dark:border-slate-800"
                                >
                                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/10 text-blue-600">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 sm:py-28">
                    <div className="container mx-auto px-6">
                        <div className="bg-slate-900 dark:bg-blue-600/10 rounded-xl p-10 sm:p-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                                Ready to find your focus?
                            </h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400 dark:text-slate-300">
                                Join thousands of users who are organizing their lives and achieving their goals with
                                Clarity.
                            </p>
                            <div className="mt-8">
                                <button className="flex w-auto mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-blue-600 text-white text-base font-bold leading-normal hover:bg-blue-700 transition-colors">
                                    <span className="truncate">Start your free trial</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 bg-white dark:bg-[#1c2127] border-t border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            © 2024 Clarity Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
