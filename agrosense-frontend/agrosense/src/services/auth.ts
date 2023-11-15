import { AxiosResponse } from "axios";
import { TOKEN, getDataFromLocalStorage } from "../configs";
import { DefaultResponse, GetNewTokenResponse, SignInRequest, SignInResponse, SignUpRequest } from "../types";
import httpRequest from "./api";

export const signUp = async (
    request: SignUpRequest,
): Promise<AxiosResponse<DefaultResponse>> => {
    return await httpRequest.post('/auth/signup', request);
};

export const signIn = async (
    request: SignInRequest,
): Promise<AxiosResponse<SignInResponse>> => {
    return await httpRequest.post('/auth/signin', request);
};

export const getNewToken = async (): Promise<
    AxiosResponse<GetNewTokenResponse>
> => {
    return await getDataFromLocalStorage(TOKEN).then(resp =>
        httpRequest.post('/auth/getNewToken', {
            refreshToken: resp.refreshToken,
        }),
    );
};