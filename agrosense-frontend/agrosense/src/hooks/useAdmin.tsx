import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { adminService } from '../services';
import { GetAllCaseResponse, GetAllFarmersResponse } from '../types';

export const useGetAllCase = () =>
    useMutation<AxiosResponse<GetAllCaseResponse>, AxiosError>(() => {
        return adminService.getAllCases();
    });

export const useGetAllFarmers = () =>
    useMutation<AxiosResponse<GetAllFarmersResponse>, AxiosError>(() => {
        return adminService.getAllFarmers();
    });
