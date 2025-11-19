"use client";

import { useEffect, useState } from "react";
import { todoService } from "../services/todoService";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    taskId: string | null;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export default function DeleteConfirmationModal({
    isOpen,
    taskId,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    description = "Are you sure you want to permanently delete this task? This action cannot be undone.",
}: DeleteConfirmationModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !isLoading) onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose, isLoading]);

    useEffect(() => {
        if (!isOpen) return;

        const timeoutId = window.setTimeout(() => {
            setError("");
            setIsLoading(false);
        }, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (!taskId) return;

        setIsLoading(true);
        setError("");

        try {
            await todoService.deleteTodo(taskId);

            onConfirm();
        } catch (err) {
            console.error(err);
            setError("Failed to delete task. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-sans p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => !isLoading && onClose()}
                aria-hidden="true"
            />

            <div
                className="relative flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-2xl dark:bg-zinc-800 animate-in fade-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-7 w-7 text-red-500 dark:text-red-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-center">
                    <h3
                        id="modal-title"
                        className="text-[#111418] dark:text-gray-100 tracking-tight text-2xl font-bold leading-tight"
                    >
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">{description}</p>

                    {error && (
                        <p className="text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded text-sm mt-2 border border-red-100 dark:border-red-800">
                            {error}
                        </p>
                    )}
                </div>

                <div className="flex w-full flex-col-reverse sm:flex-row gap-3 pt-2">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#f0f2f4] dark:bg-zinc-700 text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        <span className="truncate">Cancel</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#E53935] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        {isLoading ? (
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
                        ) : (
                            <span className="truncate">Delete</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
