import { AxiosResponse } from "axios";
import { DefaultResponse, GetNewTokenResponse, SignUpRequest } from "../types";
import httpRequest from "./api";
import { TOKEN, getDataFromLocalStorage } from "../configs";

export const signUp = async (
    request: SignUpRequest,
): Promise<AxiosResponse<DefaultResponse>> => {
    console.log('request', request)
    return await httpRequest.post('/auth/signup', request);
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