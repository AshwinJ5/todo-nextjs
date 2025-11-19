"use client";

import { useState, useEffect } from "react";

export interface TaskData {
    id: string | number;
    description: string;
    isCompleted: boolean;
    dueDate: string;
}

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: TaskData | null;
    onSave: (updatedTask: TaskData) => void;
    onDelete: (taskId: string | number) => void;
}

export default function EditTaskModal({ isOpen, onClose, task, onSave, onDelete }: EditTaskModalProps) {
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (!task || !isOpen) return;
        const timer = setTimeout(() => {
            setDescription(task.description);
            setIsCompleted(task.isCompleted);
            setDueDate(task.dueDate);
        }, 0);
        return () => clearTimeout(timer);
    }, [task, isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const handleSave = () => {
        if (task) {
            onSave({
                ...task,
                description,
                isCompleted,
                dueDate,
            });
            onClose();
        }
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative flex w-full max-w-lg flex-col rounded-xl bg-white dark:bg-zinc-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200 m-4">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-zinc-800">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Edit Task</h1>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:focus:ring-offset-zinc-900 transition-colors"
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
                    <div className="flex flex-col">
                        <label
                            className="text-sm font-medium text-slate-700 dark:text-slate-300 pb-2"
                            htmlFor="task-description"
                        >
                            Task
                        </label>
                        <textarea
                            id="task-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What needs to be done?"
                            className="flex w-full resize-none rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none min-h-32 text-base font-normal leading-normal p-4"
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 min-h-14">
                        <label className="flex items-center gap-4 cursor-pointer group" htmlFor="task-completed">
                            <div className="relative flex items-center">
                                <input
                                    id="task-completed"
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
                            <span className="text-base font-medium text-slate-700 dark:text-slate-300 flex-1 truncate select-none">
                                Completed
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <label
                            className="text-sm font-medium text-slate-700 dark:text-slate-300 pb-2"
                            htmlFor="complete-by"
                        >
                            Complete by
                        </label>
                        <div className="relative flex w-full items-stretch">
                            <input
                                id="complete-by"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="h-12 flex-1 rounded-l-lg border border-r-0 border-slate-300 bg-white p-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-50 dark:placeholder:text-zinc-500"
                            />
                            <div className="flex items-center justify-center rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 px-4 text-slate-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 pointer-events-none">
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
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 border-t border-slate-200 dark:border-zinc-800">
                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-4 py-2 text-sm font-semibold text-red-600 rounded-lg hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-zinc-900 transition-colors"
                    >
                        Delete Task
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!description.trim()}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#137fec] rounded-lg shadow-sm hover:bg-[#137fec]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
