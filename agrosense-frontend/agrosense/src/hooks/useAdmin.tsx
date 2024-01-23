import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { adminService } from '../services';
import {
    AddPestRequest,
    AddPestResponse,
    DefaultResponse,
    GetAllCaseResponse,
    GetAllFarmersResponse,
    GetAllSolutionsResponse,
    GetCaseResponse,
    GetFarmerByEmailResponse,
    VerifyCaseRequest,
    VerifyConsultationRequest,
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

export const useAddPestImage = () => {
    return useMutation<AxiosResponse<DefaultResponse>, AxiosError, FormData>(
        data => {
            return adminService.addPestImage(data);
        },
    );
};

export const useGetCaseById = (id: string) => {
    return useMutation<AxiosResponse<GetCaseResponse>, AxiosError>(() => {
        return adminService.getCaseById(id);
    });
};

export const useVerifyCase = () =>
    useMutation<AxiosResponse<DefaultResponse>, AxiosError, VerifyCaseRequest>(
        data => {
            return adminService.verifyCase(data);
        },
    );

export const useGetUserByEmail = (email: string) => {
    return useMutation<AxiosResponse<GetFarmerByEmailResponse>, AxiosError>(
        () => {
            return adminService.getUserByEmail(email);
        },
    );
};

export const useVerifyConsultation = () => {
    return useMutation<
        AxiosResponse<DefaultResponse>,
        AxiosError,
        VerifyConsultationRequest
    >(data => {
        return adminService.verifyConsultation(data);
    });
};
