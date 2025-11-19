import Link from "next/link";
import React from "react";

const PageNotFound = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#f6f7f8] dark:bg-[#101922] text-[#1f2937] dark:text-[#f9fafb] font-sans">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap px-6 sm:px-10 py-4">
                        <div className="flex items-center gap-4 text-[#1f2937] dark:text-[#f9fafb]">
                            <div className="h-8 w-8 text-[#137fec]">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Taskly</h2>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center max-w-xl flex-1 text-center">
                            <div className="flex w-full max-w-xs sm:max-w-sm grow p-4">
                                <div className="w-full gap-1 overflow-hidden aspect-4/3 rounded-lg flex">
                                    <div
                                        className="w-full bg-center bg-no-repeat bg-contain"
                                        aria-label="An illustration of a paper airplane made from a task list, symbolizing a lost or misdirected page."
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3Kz6jUGsAE_GHbebsT01vbSWTA6uHmbRtY3Q9Q-4hl0Ml1xxlPDD6I7dJ9n8nqMvHPDkcJhfS1EhciOWV_hd-9oO54x57FSIaO3sWqZ0Z7bkBr6-XVDnlrShAPFICMraMWTQ6Fsv3Au5D77mn9asVNTrfsyINRKN68bZ9eLf9QeJuaqx3mNjJE9GOKQHpkBcVQ9mQG09YoS65xcaOjMo7I_cAv8o_Wo2XDLuALmfCvjAJ1bfVN18_mhJikgKYajz--isgWgtGbNg")',
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <h1 className="text-[#1f2937] dark:text-[#f9fafb] tracking-tighter text-6xl sm:text-7xl font-bold leading-tight pt-6 pb-2">
                                404
                            </h1>
                            <h2 className="text-[#1f2937] dark:text-[#f9fafb] text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] pb-3">
                                Oops! Page Not Found.
                            </h2>
                            <p className="text-[#1f2937]/80 dark:text-[#f9fafb]/80 text-base font-normal leading-relaxed max-w-md pb-8">
                                It seems this page has been checked off the list or never existed.
                                {"Let's get you back on track."}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg bg-[#137fec] px-6 text-base font-semibold text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-[#137fec]/90 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:ring-offset-2 focus:ring-offset-[#f6f7f8] dark:focus:ring-offset-[#101922] w-full sm:w-auto"
                                >
                                    Return to Dashboard
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-lg border border-[#1f2937]/20 dark:border-[#f9fafb]/20 bg-transparent px-6 text-base font-semibold text-[#1f2937] dark:text-[#f9fafb] transition-colors duration-200 ease-in-out hover:bg-[#1f2937]/5 dark:hover:bg-[#f9fafb]/5 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:ring-offset-2 focus:ring-offset-[#f6f7f8] dark:focus:ring-offset-[#101922] w-full sm:w-auto"
                                >
                                    Go Home
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
