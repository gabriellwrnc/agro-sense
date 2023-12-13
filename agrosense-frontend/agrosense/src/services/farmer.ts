import { AxiosResponse } from 'axios';
import { ConsultationRequest, ConsultationResponse } from '../types';
import httpRequest from './api';

export const consultation = async (
    request: ConsultationRequest,
): Promise<AxiosResponse<ConsultationResponse>> => {
    return await httpRequest.post('/farmer/consultate', request);
};
