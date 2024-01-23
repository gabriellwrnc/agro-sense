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
    imageUrl?: string;
    caseCount: number;
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

export type Case = {
    caseCode: string;
    pestCode: string;
    symptoms: [
        {
            symptomCode: string;
            weight?: number;
        },
    ];
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type GetAllCaseResponse = {
    status: string;
    data: {
        unverifiedCaseCount: number;
        cases: Case[];
    };
};

export type Farmer = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    firebaseId: string;
    consultationCount: number;
};

export type GetAllFarmersResponse = {
    status: string;
    data: Farmer[];
};

export type AddPestRequest = {
    name: string;
    description: string;
    solutionCodes: string[];
    symptom: {
        symptomCode: string;
        weightValue: number;
    }[];
};

export type AddPestResponse = {
    status: string;
    data: {
        pest: Pest;
        symptoms: string[];
        solutions: string[];
    };
};

export type Solution = {
    name: string;
    solutionCode: string;
    pestCode: string[];
};

export type GetAllSolutionsResponse = {
    status: string;
    data: Solution[];
};

export type GetCaseResponse = {
    status: string;
    data: {
        case: Case;
        pestName: string;
    };
};

export type VerifyCaseRequest = {
    caseCode: string;
    pestCode: string;
    symptom: {
        symptomCode: string;
        weightValue: number;
    }[];
};

export type UnverifiedConsultation = {
    consultationResult: ConsultationResult;
    _id: string;
    userId: string;
    symptomCodes: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type ConsultationResult = {
    mainPest: MainPest;
    status: string;
    otherPests: OtherPest[];
};

export type MainPest = {
    name: string;
    solution: string[];
    similarityPercentage: number;
};

export type OtherPest = {
    name: string;
    solution: string[];
    similarityPercentage: number;
    _id: string;
};

export type GetFarmerByEmailResponse = {
    status: string;
    data: {
        user: {
            _id: string;
            name: string;
            phoneNumber: string;
            firebaseId: string;
            email: string;
            role: string;
            __v: number;
        };
        consultationCount: number;
        unverifiedConsultation: UnverifiedConsultation[];
    };
};
