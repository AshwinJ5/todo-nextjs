"use client";

import { useState, useEffect } from "react";

interface TaskData {
    description: string;
    dueDate: string;
    isCompleted: boolean;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (data: TaskData) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const t = window.setTimeout(() => {
            setDescription("");
            setDueDate("");
            setIsCompleted(false);
        }, 0);
        return () => clearTimeout(t);
    }, [isOpen]);

    const handleSubmit = () => {
        onAddTask({ description, dueDate, isCompleted });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity p-4 font-sans"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="flex w-full max-w-lg flex-col rounded-xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-gray-200 dark:ring-zinc-800 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between gap-2 p-6 border-b border-slate-200 dark:border-zinc-800 items-center">
                    <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight">Add New Task</p>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none"
                        type="button"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-6">
                    <label className="flex flex-col w-full">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
                            Task
                        </span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 min-h-32 placeholder:text-slate-400 dark:placeholder:text-zinc-500 p-4 text-base font-normal leading-normal"
                            placeholder="e.g., Finish design mockups"
                        />
                    </label>

                    <label className="flex flex-col w-full">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2">
                            Due Date
                        </span>
                        <div className="flex w-full flex-1 items-stretch rounded-lg group">
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 h-12 placeholder:text-slate-400 dark:placeholder:text-zinc-500 p-4 border-r-0 pr-2 text-base font-normal leading-normal appearance-none"
                            />
                            <div className="text-slate-500 dark:text-zinc-400 flex border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 items-center justify-center pr-4 rounded-r-lg border-l-0 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </label>

                    <div>
                        <label className="flex items-center gap-x-3 py-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={(e) => setIsCompleted(e.target.checked)}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-300 dark:border-zinc-600 bg-transparent checked:bg-[#137fec] checked:border-[#137fec] focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] focus:ring-offset-white dark:focus:ring-offset-zinc-900 transition-all"
                                />
                                <svg
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none hidden peer-checked:block text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal select-none">
                                Mark as Completed
                            </p>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row-reverse justify-start gap-3 p-6 border-t border-slate-200 dark:border-zinc-800">
                    <button
                        onClick={handleSubmit}
                        disabled={!description.trim()}
                        className="flex items-center justify-center rounded-lg bg-[#137fec] px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-[#137fec]/90 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800 px-5 py-2.5 text-center text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-gray-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-zinc-600 border border-transparent"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
