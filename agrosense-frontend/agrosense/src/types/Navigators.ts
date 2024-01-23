export type AuthParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type RootParamList = {
    Splash: undefined;
    MainScreenAdminStack: undefined;
    FarmerScreenStacks: undefined;
    AdminScreenStacks: undefined;
    AuthScreenStack: undefined;
};

export type FarmerStackParamList = {
    FarmerHomeTab: undefined;
    FarmerConsult: undefined;
    FarmerConsultResult: undefined;
};

export type FarmerHomeTabParamList = {
    FarmerHome: undefined;
    FarmerHistory: undefined;
    FarmerNotif: undefined;
};

export type AdminStackParamList = {
    AdminHomeDrawer: undefined;
    AdminAddPestScreen: undefined;
    AdminAddPestSymptomWeightScreen: {
        name: string;
        description: string;
        symptom: {
            symptomCode: string;
            weightValue: number;
        }[];
        solutionCodes: string[];
    };
    AdminAddPestImageScreen: {
        name: string;
        description: string;
        symptom: {
            symptomCode: string;
            weightValue: number;
        }[];
        solutionCodes: string[];
    };
    AdminCaseDetailScreen: {
        caseCode: string;
    };
    AdminVerifyCaseScreen: {
        caseCode: string;
        pestCode: string;
    };
    AdminVerifyCaseSymptomWeightScreen: {
        symptom: {
            symptomCode: string;
            weightValue: number;
        }[];
        pest: {
            value: string;
            label: string;
        };
        caseCode: string;
    };
    AdminUserDetailScreen: {
        email: string;
    };
    AdminVerifyConstultationScreen: {
        consultationId: string;
    };
};

export type AdminHomeDrawerParamList = {
    AdminHomeScreen: undefined;
    AdminPestDataScreen: undefined;
    AdminSymptomDataScreen: undefined;
    AdminCaseDataScreen: undefined;
    AdminFarmerDataScreen: undefined;
};
