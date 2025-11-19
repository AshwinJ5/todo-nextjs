"use client";

import Link from "next/link";
import { useState } from "react";
import EditTaskModal, { TaskData } from "../components/EditTaskModal";
import AddTaskModal from "../components/AddtaskModal";
import DeleteConfirmationModal from "../components/DeleteTaskModal";

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    dueDate: string;
    addedDate: string;
    priorityColor: string;
}

type FilterType = "All" | "Active" | "Completed";

const INITIAL_TASKS: Task[] = [
    {
        id: 1,
        title: "Finalize the Q4 report presentation",
        isCompleted: true,
        dueDate: "2024-10-26",
        addedDate: "Oct 20",
        priorityColor: "bg-green-500",
    },
    {
        id: 2,
        title: "Schedule a team sync for the new project kickoff",
        isCompleted: false,
        dueDate: "2024-10-28",
        addedDate: "Oct 22",
        priorityColor: "bg-orange-500",
    },
    {
        id: 3,
        title: "Buy groceries for the week",
        isCompleted: false,
        dueDate: "2024-10-24",
        addedDate: "Oct 24",
        priorityColor: "bg-red-500",
    },
    {
        id: 4,
        title: "Renew gym membership",
        isCompleted: false,
        dueDate: "2024-11-05",
        addedDate: "Oct 24",
        priorityColor: "bg-blue-500",
    },
];

export default function TaskDashboard() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [filter, setFilter] = useState<FilterType>("All");
    const [searchQuery, setSearchQuery] = useState("");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [taskToEdit, setTaskToEdit] = useState<TaskData | null>(null);
    const [taskToDeleteId, setTaskToDeleteId] = useState<number | null>(null);

    const toggleTask = (id: number) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    };

    const handleAddTask = (data: { description: string; dueDate: string; isCompleted: boolean }) => {
        const newTask: Task = {
            id: Date.now(),
            title: data.description,
            isCompleted: data.isCompleted,
            dueDate: data.dueDate || "No Date",
            addedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            priorityColor: "bg-blue-500",
        };
        setTasks((prev) => [newTask, ...prev]);
        setIsAddModalOpen(false);
    };

    const openEditModal = (task: Task) => {
        setTaskToEdit({
            id: task.id,
            description: task.title,
            isCompleted: task.isCompleted,
            dueDate: task.dueDate,
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEditedTask = (updatedData: TaskData) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === updatedData.id
                    ? {
                          ...t,
                          title: updatedData.description,
                          isCompleted: updatedData.isCompleted,
                          dueDate: updatedData.dueDate,
                      }
                    : t
            )
        );
        setIsEditModalOpen(false);
        setTaskToEdit(null);
    };

    const openDeleteModal = (id: number) => {
        setTaskToDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDeleteId !== null) {
            setTasks((prev) => prev.filter((t) => t.id !== taskToDeleteId));
            setIsEditModalOpen(false);
            setIsDeleteModalOpen(false);
            setTaskToDeleteId(null);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (!task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filter === "Active") return !task.isCompleted;
        if (filter === "Completed") return task.isCompleted;
        return true;
    });

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] min-h-screen w-full font-sans text-[#333333] dark:text-gray-200">
            <div className="flex flex-col h-full min-h-screen">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-700 px-6 md:px-10 py-3 bg-white dark:bg-[#101922]/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-8">
                        <Link href={"/"} className="flex items-center gap-4 text-gray-800 dark:text-white">
                            <div className="size-6 text-[#137fec]">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">Clarity</h2>
                        </Link>
                    </div>

                    <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
                        <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-gray-500 dark:text-gray-400 flex bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                    placeholder="Search tasks..."
                                />
                            </div>
                        </label>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#137fec]/90 transition-colors gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span className="truncate hidden sm:inline">New Task</span>
                        </button>

                        <div className="relative size-10 rounded-full overflow-hidden flex justify-center items-center bg-gray-200 dark:bg-gray-700">
                            <svg
                                className="text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </header>

                <main className="px-4 sm:px-10 flex flex-1 justify-center py-5">
                    <div className="flex flex-col w-full max-w-5xl flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4 items-center">
                            <p className="text-gray-800 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
                                My Tasks
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-4 px-4 py-3 items-center">
                            <div className="flex h-10 w-full md:w-auto items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
                                {["All", "Active", "Completed"].map((f) => (
                                    <label
                                        key={f}
                                        className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-4 text-sm font-medium leading-normal transition-all ${
                                            filter === f
                                                ? "bg-white dark:bg-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-gray-800 dark:text-white"
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}
                                    >
                                        <span className="truncate">{f}</span>
                                        <input
                                            className="invisible w-0"
                                            name="task-filter"
                                            type="radio"
                                            checked={filter === f}
                                            onChange={() => setFilter(f as FilterType)}
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="flex gap-2 items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                                <div className="relative">
                                    <select className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec]/50">
                                        <option>Due Date</option>
                                        <option>Creation Date</option>
                                        <option>Priority</option>
                                    </select>
                                    <svg
                                        className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 px-4 flex flex-col gap-2">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="group flex items-center gap-4 bg-white dark:bg-gray-800/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => toggleTask(task.id)}
                                            className="h-5 w-5 shrink-0 rounded-md border-gray-300 dark:border-gray-600 bg-transparent text-[#137fec] checked:bg-[#137fec] checked:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                                        />

                                        <div className="grow min-w-0">
                                            <p
                                                className={`text-gray-800 dark:text-gray-100 text-base font-medium leading-normal truncate sm:whitespace-normal ${
                                                    task.isCompleted ? "line-through text-gray-400 dark:text-gray-500" : ""
                                                }`}
                                            >
                                                {task.title}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                                                <span
                                                    className={`text-xs text-white ${task.priorityColor} px-2 py-0.5 rounded-full opacity-80 whitespace-nowrap`}
                                                >
                                                    Due: {task.dueDate}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    Added: {task.addedDate}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                                            <button
                                                onClick={() => openEditModal(task)}
                                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors focus:outline-none focus:text-[#137fec]"
                                                aria-label="Edit task"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(task.id)}
                                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors focus:outline-none focus:text-red-500"
                                                aria-label="Delete task"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
                                        {"You're all caught up!"}
                                    </h3>
                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                        Looks like there are no pending tasks. Enjoy your day!
                                    </p>
                                    <button
                                        onClick={() => setIsAddModalOpen(true)}
                                        className="mt-6 flex mx-auto min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#137fec]/90 transition-colors gap-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        <span className="truncate">Add a New Task</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddTask={handleAddTask} />

                <EditTaskModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setTaskToEdit(null);
                    }}
                    task={taskToEdit}
                    onSave={handleSaveEditedTask}
                    onDelete={(id) => {
                        setIsEditModalOpen(false);
                        openDeleteModal(Number(id));
                    }}
                />

                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setTaskToDeleteId(null);
                    }}
                    onConfirm={confirmDeleteTask}
                    description="Are you sure you want to permanently delete this task?"
                />
            </div>
        </div>
    );
}
