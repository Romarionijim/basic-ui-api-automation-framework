export interface ApiRequestOptions<T> {
    data?: T;
    params?: Record<string, string>;
    authRequired?: boolean;
}