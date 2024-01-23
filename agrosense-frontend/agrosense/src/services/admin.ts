import { AxiosResponse } from 'axios';
import {
    AddPestRequest,
    AddPestResponse,
    DefaultResponse,
    GetAllCaseResponse,
    GetAllFarmersResponse,
    GetAllSolutionsResponse,
    GetCaseResponse,
    VerifyCaseRequest,
} from '../types';
import httpRequest from './api';

export const getAllCases = async (): Promise<
    AxiosResponse<GetAllCaseResponse>
> => {
    return await httpRequest.get('/admin/getAllCases');
};

export const getAllFarmers = async (): Promise<
    AxiosResponse<GetAllFarmersResponse>
> => {
    return await httpRequest.get('/admin/getAllUsers');
};

export const addPest = async (
    request: AddPestRequest,
): Promise<AxiosResponse<AddPestResponse>> => {
    return await httpRequest.post('/admin/addPest', request);
};

export const getAllSolutions = async (): Promise<
    AxiosResponse<GetAllSolutionsResponse>
> => {
    return await httpRequest.get('/admin/getAllSolutions');
};

export const addPestImage = async (
    request: FormData,
): Promise<AxiosResponse<DefaultResponse>> => {
    return await httpRequest.post('/admin/addPestImage', request, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getCaseById = async (
    caseCode: string,
): Promise<AxiosResponse<GetCaseResponse>> => {
    return await httpRequest.get(`/admin/getCaseById/?caseCode=${caseCode}`);
};

export const verifyCase = async (
    request: VerifyCaseRequest,
): Promise<AxiosResponse<DefaultResponse>> => {
    return await httpRequest.post('/admin/verifiedCase', request);
};
