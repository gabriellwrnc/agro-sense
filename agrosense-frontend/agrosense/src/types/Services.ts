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
    status: string;
    data: {
        _id: string;
        name: string;
        phoneNumber: string;
        firebaseId: string;
        email: string;
        role: string;
        __v: number;
    };
    accessToken: string;
    refreshToken: string;
};

export type GetNewTokenResponse = {
    status: string;
    accessToken: string;
    refreshToken?: string;
};

export type Pest = {
    name: string;
    pestCode: string;
    description: string;
    imageUrl: string;
    symptoms: string[];
    solutions: string[];
};

export type GetAllPestsResponse = {
    status: string;
    data: Pest[];
};

export type Symptom = {
    name: string;
    symptomCode: string;
    pestCode: string[];
    weight: [
        {
            pestCode: string;
            weightValue: number;
        },
    ];
};

export type GetAllSymptomsResponse = {
    status: string;
    data: Symptom[];
};

export type ConsultationRequest = {
    userId: string;
    symptomCodes: string[];
};

export type ConsultationPestData = {
    name: string;
    similarityPercentage: number;
    solution: string[];
};

export type ConsultationResponse = {
    status: string;
    consultationResult: {
        consultationStatus: string;
        mainPest: ConsultationPestData;
        otherPests: ConsultationPestData[];
    };
};
