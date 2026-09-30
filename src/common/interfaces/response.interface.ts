// src/common/interfaces/response.interface.ts
export interface IResponse<T = any> {
    success: boolean;
    data?: T;
    message: string;
}