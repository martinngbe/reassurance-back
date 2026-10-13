
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pageInfo : {
    total: number;
    page: number;
    limit: number;
    totalPages: number; 
  }
  
}

// --- Interfaces de réponse HTTP ---
export interface IPageInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  pageInfo?: IPageInfo;
}

  
