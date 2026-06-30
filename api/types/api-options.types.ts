export interface ApiRequestOptions {
    data?: string;
    params?: Record<string, string>;
    authRequired?: boolean;
}