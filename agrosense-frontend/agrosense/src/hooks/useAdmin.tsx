import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { adminService } from '../services';
import {
    AddPestRequest,
    AddPestResponse,
    GetAllCaseResponse,
    GetAllFarmersResponse,
    GetAllSolutionsResponse,
} from '../types';

export const useGetAllCase = () =>
    useMutation<AxiosResponse<GetAllCaseResponse>, AxiosError>(() => {
        return adminService.getAllCases();
    });

export const useGetAllFarmers = () =>
    useMutation<AxiosResponse<GetAllFarmersResponse>, AxiosError>(() => {
        return adminService.getAllFarmers();
    });

export const useAddPest = () =>
    useMutation<AxiosResponse<AddPestResponse>, AxiosError, AddPestRequest>(
        data => {
            return adminService.addPest(data);
        },
    );

export const useGetAllSolution = () =>
    useMutation<AxiosResponse<GetAllSolutionsResponse>, AxiosError>(() => {
        return adminService.getAllSolutions();
    });
