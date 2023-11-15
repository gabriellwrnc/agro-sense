export type DefaultResponse = {
    status: string;
};

export type SignInRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = SignInRequest & {
    name: string;
    phoneNumber: string;
    confirmPassword: string;
};

export type SignInResponse = {
    status: string
    data: {
        _id: string
        name: string
        phoneNumber: string
        firebaseId: string
        email: string
        role: string
        __v: number
    }
    accessToken: string
    refreshToken: string
}

export type GetNewTokenResponse = {
    status: string;
    accessToken: string;
    refreshToken?: string;
};