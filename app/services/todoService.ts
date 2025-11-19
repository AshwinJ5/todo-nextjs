import { GetTodosParams } from "../types/todo";
import { TodoApiResponse } from "@/app/types/todo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const getAuthHeader = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

export const todoService = {
    getAllTodos: async (params?: GetTodosParams): Promise<TodoApiResponse[]> => {
        const url = new URL(`${API_BASE_URL}/todo`);
        if (params) {
            if (params.completed) url.searchParams.append("completed", params.completed);
            if (params.sortBy) url.searchParams.append("sort", params.sortBy);
            if (params.search) url.searchParams.append("search", params.search);
        }
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: getAuthHeader(),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to fetch tasks");
        }

        return response.json();
    },
    createTodo: async (title: string, dateString: string): Promise<TodoApiResponse> => {
        const isoDate = dateString ? new Date(dateString).toISOString() : new Date().toISOString();

        const payload = {
            title: title,
            toBeCompletedBy: isoDate,
        };

        const response = await fetch(`${API_BASE_URL}/todo`, {
            method: "POST",
            headers: getAuthHeader(),
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        return response.json();
    },

    deleteTodo: async (id: string): Promise<TodoApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
            method: "DELETE",
            headers: getAuthHeader(),
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        return response.json();
    },
    updateTodo: async (
        id: string,
        updates: { title?: string; completed?: boolean; toBeCompletedBy?: string }
    ): Promise<TodoApiResponse> => {
        const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
            method: "PATCH",
            headers: getAuthHeader(),
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        return response.json();
    },
};
