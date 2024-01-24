import { Injectable } from "@nestjs/common";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { ApiResponse, HttpAdapater } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapater {

    private axiosInstance: AxiosInstance;

    //TODO * Improve base url parametter ( no fixed in module)
    constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: defaultHeaders,
        });
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {

        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return this.transformResponse<T>(response);
        } catch (error) {
            console.log(error);
            throw new Error('Something was wrong with the get request');
        }

    }

    async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {

        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return this.transformResponse<T>(response);
        } catch (error) {
            console.log(error);
            throw new Error('Something was wrong with the get request');
        }

    }

    async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
            return this.transformResponse<T>(response);
        } catch (error) {
            console.log(error);
            throw new Error('Something was wrong with the put request');
        }

    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
            return this.transformResponse<T>(response);
        } catch (error) {
            console.log(error);
            throw new Error('Something was wrong with the delete request');
        }

    }

    private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
    }

}