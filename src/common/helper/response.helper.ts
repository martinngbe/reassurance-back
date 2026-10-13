// common/helpers/response.helper.ts

import { IResponse, IPageInfo } from "../interfaces/response.interface";

export const OPERATION_SUCCES = 'Opération effectuée avec succès';
export const OPERATION_ECHEC = 'Opération a échoué';

/**
 * Helper pour une réponse avec une seule entité.
 */
export function success<T>(data: T, message = OPERATION_SUCCES): IResponse<T> {
  return { success: true, data, message };
}

/**
 * Helper pour une réponse avec une liste d'entités.
 */
export function successList<T>(
  data: T[],
  message = OPERATION_SUCCES,
  pageInfo?: IPageInfo,
): IResponse<T[]> {
  return { success: true, data, message, pageInfo };
}

/**
 * Helper pour formater une réponse paginée.
 */
export function successPaginated<T>(
  result: { 
    data: T[]; 
    pageInfo:IPageInfo  
},
  message = OPERATION_SUCCES,
): IResponse<T[]> {
  return {
    success: true,
    data: result.data,
    message,
    pageInfo: result.pageInfo
  };
}

/**
 * Helper pour une réponse d'échec.
 */
export function failure(message = OPERATION_ECHEC, data?: any): IResponse {
  return { success: false, message, data };
}