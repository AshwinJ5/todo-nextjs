export interface SignUpFormData {
    email: string;
    username: string;
    name: string;
    password: string;
}

export interface AuthResponse {
    message?: string;
    // user?: any;
}

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export interface AuthResponse {
    message?: string;
    // user?: any;
    token?: string;
}
