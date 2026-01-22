const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const API_VERSION = "v1";

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/${API_VERSION}/auth/login`,
        LOGOUT: `${API_BASE_URL}/api/${API_VERSION}/auth/logout`,
        REGISTER: `${API_BASE_URL}/api/${API_VERSION}/auth/register`,
        VERIFY_EMAIL: `${API_BASE_URL}/api/${API_VERSION}/auth/verify-email`,
        FORGOT_PASSWORD: `${API_BASE_URL}/api/${API_VERSION}/auth/password/forgot`,
        RESET_PASSWORD: `${API_BASE_URL}/api/${API_VERSION}/auth/password/reset`,
        CHANGE_PASSWORD: `${API_BASE_URL}/api/${API_VERSION}/auth/password/change`,
    },
    CATEGORIES: {
        GET_TREE: `${API_BASE_URL}/api/${API_VERSION}/categories/tree`,
        GET_ALL: `${API_BASE_URL}/api/${API_VERSION}/categories`,
        GET_BY_ID: `${API_BASE_URL}/api/${API_VERSION}/categories`,
        GET_DELETED: `${API_BASE_URL}/api/${API_VERSION}/admin/categories/deleted`,
        CREATE: `${API_BASE_URL}/api/${API_VERSION}/admin/categories`,
        UPDATE: `${API_BASE_URL}/api/${API_VERSION}/admin/categories`,
        DELETE: `${API_BASE_URL}/api/${API_VERSION}/admin/categories`,
        RESTORE: `${API_BASE_URL}/api/${API_VERSION}/admin/categories`,
    },
};

export interface ApiResponse<T = any> {
    success: boolean;
    status: number;
    message: string;
    data?: T;
    code?: string;
    timestamp?: string;
}

export async function apiRequest<T = any>(
    url: string,
    options: RequestInit = {},
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (response.status === 204) {
            return {
                success: true,
                status: 204,
                message: "Operation successful",
                data: undefined,
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}
