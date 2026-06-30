import { APIRequestContext } from "@playwright/test";
import { APIRequestMethods } from "../consts/api-request-methods.consts";
import { ApiRequestOptions } from "../types/api-options.types";

export class ApiClient {
    constructor(protected request: APIRequestContext) {
        this.request = request;
    }

    async get(endpoint: string, options?: ApiRequestOptions) {
        return this.makeHttpRequest(APIRequestMethods.GET, endpoint, options);
    }

    async post(endpoint: string, options?: ApiRequestOptions) {
        return this.makeHttpRequest(APIRequestMethods.POST, endpoint, options);
    }

    async put(endpoint: string, options?: ApiRequestOptions) {
        return this.makeHttpRequest(APIRequestMethods.PUT, endpoint, options);
    }

    async patch(endpoint: string, options?: ApiRequestOptions) {
        return this.makeHttpRequest(APIRequestMethods.PATCH, endpoint, options);
    }

    async delete(endpoint: string, options?: ApiRequestOptions) {
        return this.makeHttpRequest(APIRequestMethods.DELETE, endpoint, options);
    }

    private async makeHttpRequest(method: APIRequestMethods, endpoint: string, options: ApiRequestOptions = {}) {
        const { data, params, authRequired } = options;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        if (authRequired) {
            headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
        }

        return this.request[method](`${endpoint}`, {
            data,
            params,
            headers,
        })
    }

}