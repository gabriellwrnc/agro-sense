import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { GetAllSymptomsResponse } from '../types';
import { symptomService } from '../services';

export const useGetAllSymptoms = () =>
    useMutation<AxiosResponse<GetAllSymptomsResponse>, AxiosError>(() => {
        return symptomService.getAllSymptoms();
    });
