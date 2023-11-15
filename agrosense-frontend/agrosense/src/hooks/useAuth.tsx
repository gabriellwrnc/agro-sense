import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { authService } from '../services';
import {
    DefaultResponse,
    GetNewTokenResponse,
    SignInRequest,
    SignInResponse,
    SignUpRequest,
} from '../types';

export const useSignUp = () =>
    useMutation<AxiosResponse<DefaultResponse>, AxiosError, SignUpRequest>(
        data => {
            return authService.signUp(data);
        },
    );

export const useSignIn = () =>
    useMutation<AxiosResponse<SignInResponse>, AxiosError, SignInRequest>(
        data => {
            return authService.signIn(data);
        },
    );

export const useGetNewToken = () =>
    useMutation<AxiosResponse<GetNewTokenResponse>, AxiosError>(() => {
        return authService.getNewToken();
    });
