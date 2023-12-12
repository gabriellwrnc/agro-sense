import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { GetAllPestsResponse } from '../types';
import { pestService } from '../services';

export const useGetAllPest = () =>
    useMutation<AxiosResponse<GetAllPestsResponse>, AxiosError>(() => {
        return pestService.getAllPests();
    });
