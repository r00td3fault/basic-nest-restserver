

export interface HttpAdapater {
    get<T>(url: string, config?: any): Promise<ApiResponse<T>>;
}

export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
}