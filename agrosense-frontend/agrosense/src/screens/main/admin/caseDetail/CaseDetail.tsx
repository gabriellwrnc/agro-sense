import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Colors } from '../../../../configs';
import { useGetCaseById } from '../../../../hooks';
import { AdminCaseDetailProps, Case } from '../../../../types';

const CaseDetail: React.FC<AdminCaseDetailProps> = ({ route, navigation }) => {
    const [caseData, setCase] = React.useState<Case>({} as Case);
    const [pestName, setPestName] = React.useState<string>('');
    const mutation = useGetCaseById(route.params.caseCode);

    React.useEffect(() => {
        mutation.mutate(undefined, {
            onSuccess: resp => {
                console.log(resp.data.data);
                setCase(resp.data.data.case);
                setPestName(resp.data.data.pestName);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            {caseData.status === 'unverified' ? (
                <View
                    style={{
                        backgroundColor: Colors.bgErrorColor,
                        padding: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Colors.errorColor,
                    }}>
                    <CustomText
                        color="errorColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text="Kasus belum diverifikasi"
                    />
                    <CustomButton
                        onPress={() => {
                            navigation.navigate('AdminVerifyCaseScreen', {
                                caseCode: caseData.caseCode,
                                pestCode: caseData.pestCode,
                            });
                        }}
                        text="Verifikasi Kasus"
                        type="primary"
                    />
                </View>
            ) : (
                <View>
                    <View row centerV>
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsBold"
                            fontSize="md"
                            text="Kode Kasus: "
                        />
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsMedium"
                            fontSize="md"
                            text={caseData.caseCode}
                        />
                    </View>
                    <View row centerV>
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsBold"
                            fontSize="md"
                            text="Nama Hama: "
                        />
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsMedium"
                            fontSize="md"
                            text={pestName}
                        />
                    </View>
                    <View row centerV>
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsBold"
                            fontSize="md"
                            text="Kode Gejala: "
                        />
                        {caseData.symptoms?.map(({ symptomCode }, index) => {
                            return (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsMedium"
                                    fontSize="md"
                                    text={`${symptomCode}${
                                        index !== caseData.symptoms.length - 1
                                            ? ', '
                                            : ''
                                    }`}
                                    key={index}
                                />
                            );
                        })}
                    </View>
                </View>
            )}
        </ScreenLayout>
    );
};

export default CaseDetail;
