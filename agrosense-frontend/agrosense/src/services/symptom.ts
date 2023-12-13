import { AxiosResponse } from 'axios';
import { GetAllSymptomsResponse } from '../types';
import httpRequest from './api';

export const getAllSymptoms = async (): Promise<
    AxiosResponse<GetAllSymptomsResponse>
> => {
    return await httpRequest.get('/symptom');
};
