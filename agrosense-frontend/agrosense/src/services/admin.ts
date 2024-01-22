import { AxiosResponse } from 'axios';
import {
    AddPestRequest,
    AddPestResponse,
    GetAllCaseResponse,
    GetAllFarmersResponse,
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
