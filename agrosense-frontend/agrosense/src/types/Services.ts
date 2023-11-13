export type SignInRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = SignInRequest & {
    name: string;
    phoneNumber: string;
    confirmPassword: string;
};

export type DefaultResponse = {
    status: string;
};

export type GetNewTokenResponse = {
    status: string;
    accessToken: string;
    refreshToken?: string;
};