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
        GET_PUBLIC: `${API_BASE_URL}/api/${API_VERSION}/public/categories`,
    },
    TAGS: {
        GET_ALL: `${API_BASE_URL}/api/${API_VERSION}/admin/tags`,
        GET_BY_ID: `${API_BASE_URL}/api/${API_VERSION}/tags`,
        CREATE: `${API_BASE_URL}/api/${API_VERSION}/admin/tags`,
        UPDATE: `${API_BASE_URL}/api/${API_VERSION}/admin/tags`,
        DELETE: `${API_BASE_URL}/api/${API_VERSION}/admin/tags`,
    },
};

export interface Category {
    id: number;
    name: string;
    code: string | null;
    description: string;
    visible: boolean;
    parentId: number | null;
    deletedAt: string | null;
    children: Category[];
    slug: string;
    metaTitle: string;
    metaDescription: string;
    thumbnailUrl: string | null;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string | null;
    deletedAt: string | null;
}

export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

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
