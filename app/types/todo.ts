export interface TodoApiResponse {
    _id: string;
    title: string;
    completed: boolean;
    toBeCompletedBy: string;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    dueDate: string;
    addedDate: string;
    priorityColor: string;
}
export interface GetTodosParams {
    completed?: "yes" | "no";
    sortBy?: "created" | "toBeCompletedBy";
    search?: string;
}