import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { authService } from '../services';
import { DefaultResponse, GetNewTokenResponse, SignUpRequest } from '../types';

export const useSignUp = () =>
    useMutation<AxiosResponse<DefaultResponse>, AxiosError, SignUpRequest>(
        data => {
            return authService.signUp(data);
        },
    );

export const useGetNewToken = () =>
    useMutation<AxiosResponse<GetNewTokenResponse>, AxiosError>(() => {
        return authService.getNewToken();
    });
