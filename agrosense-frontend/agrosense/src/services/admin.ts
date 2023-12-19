import { AxiosResponse } from 'axios';
import { GetAllCaseResponse, GetAllFarmersResponse } from '../types';
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
