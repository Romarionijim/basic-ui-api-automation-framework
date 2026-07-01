import { APIRequestContext } from "@playwright/test";
import { APIRequestMethods } from "../consts/api-request-methods.consts";
import { ApiRequestOptions } from "../types/api-options.types";

export class ApiClient {
    constructor(protected request: APIRequestContext) {
        this.request = request;
    }

    async get<T>(endpoint: string, options: ApiRequestOptions<T> = {}) {
        return this.makeHttpRequest(APIRequestMethods.GET, endpoint, options);
    }

    async post<T>(endpoint: string, options: ApiRequestOptions<T> = {}) {
        return this.makeHttpRequest(APIRequestMethods.POST, endpoint, options);
    }

    async put<T>(endpoint: string, options: ApiRequestOptions<T> = {}) {
        return this.makeHttpRequest(APIRequestMethods.PUT, endpoint, options);
    }

    async patch<T>(endpoint: string, options: ApiRequestOptions<T> = {}) {
        return this.makeHttpRequest(APIRequestMethods.PATCH, endpoint, options);
    }

    async delete<T>(endpoint: string, options: ApiRequestOptions<T> = {}) {
        return this.makeHttpRequest(APIRequestMethods.DELETE, endpoint, options);
    }

    private async makeHttpRequest<T>(method: APIRequestMethods, endpoint: string, options: ApiRequestOptions<T> = {}) {
        const { data, params, authRequired } = options;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        if (authRequired) {
            headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
        }

        return this.request[method](`${endpoint}`, {
            headers,
            data,
            params
        })
    }
}