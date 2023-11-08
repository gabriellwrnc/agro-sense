export type SignInRequest = {
    email: string;
    password: string;
};

export type SignUpRequest = SignInRequest & {
    name: string;
    phoneNumber: string;
    confirmPassword: string;
};