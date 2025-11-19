import { SignUpFormData, AuthResponse, LoginCredentials } from "@/app/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined in .env.local");
}

export const authService = {
    signUp: async (userData: SignUpFormData): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create account");
            }

            return data;
        } catch (error: unknown) {
            throw error;
        }
    },
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            return data;
        } catch (error: unknown) {
            throw error;
        }
    },
};
