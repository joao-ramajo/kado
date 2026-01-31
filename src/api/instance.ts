import axios from "axios";

const token = localStorage.getItem("WALLETTOKEN");

export const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { Authorization: `Bearer ${token}` },
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem("WALLETTOKEN");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		config.headers.Authorization = undefined;
	}

	return config;
});

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			window.location.href = "/login";
			return Promise.reject(error);
		}

		return Promise.reject(error);
	},
);

export interface PaginatedResponse<T> {
	data: T[];
	totalPages: number;
	totalItems: number;
	page: number;
	pageSize: number;
}

export interface Pagination {
	pageSize: number;
	pageIndex: number;
}

export type ApiError = {
	message?: string;
	errors?: {
		input: string;
		message: string;
	}[];
};
