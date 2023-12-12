import { AxiosResponse } from 'axios';
import { GetAllPestsResponse } from '../types';
import httpRequest from './api';

export const getAllPests = async (): Promise<
    AxiosResponse<GetAllPestsResponse>
> => {
    return await httpRequest.get('/pest');
};
