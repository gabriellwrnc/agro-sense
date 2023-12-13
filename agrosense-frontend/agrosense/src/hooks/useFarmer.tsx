import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { ConsultationRequest, ConsultationResponse } from '../types';
import { farmerService } from '../services';

export const useConsultation = () =>
    useMutation<
        AxiosResponse<ConsultationResponse>,
        AxiosError,
        ConsultationRequest
    >(data => {
        return farmerService.consultation(data);
    });
