import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { useGetUserByEmail } from '../../../../hooks';
import {
    AdminUserDetailScreen,
    GetFarmerByEmailResponse,
} from '../../../../types';
import { Colors } from '../../../../configs';

const UserDetail: React.FC<AdminUserDetailScreen> = ({ navigation, route }) => {
    const { email } = route.params;
    const mutationGetUserByEmail = useGetUserByEmail(email);
    const [user, setUser] = React.useState<GetFarmerByEmailResponse>();
    const sortedUnverifiedConsultations =
        user?.data.unverifiedConsultation.sort((a, b) => {
            return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            );
        });

    React.useEffect(() => {
        mutationGetUserByEmail.mutate(undefined, {
            onSuccess: resp => {
                setUser(resp.data);
            },
            onError: err => {
                console.log(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View>
                <View row centerV>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsBold"
                        fontSize="md"
                        text="Nama: "
                    />
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsMedium"
                        fontSize="md"
                        text={user?.data.user.name}
                    />
                </View>
                <View row centerV>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsBold"
                        fontSize="md"
                        text="Email: "
                    />
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsMedium"
                        fontSize="md"
                        text={user?.data.user.email}
                    />
                </View>
                <View row centerV>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsBold"
                        fontSize="md"
                        text="Nomor: "
                    />
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsMedium"
                        fontSize="md"
                        text={user?.data.user.phoneNumber}
                    />
                </View>
                <View row centerV>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsBold"
                        fontSize="md"
                        text="Jumlah konsultasi: "
                    />
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsMedium"
                        fontSize="md"
                        text={user?.data.consultations.length}
                    />
                </View>
                <View row centerV>
                    <CustomText
                        color="errorColor"
                        fontFamily="poppinsBold"
                        fontSize="md"
                        text="Konsultasi belum terverifikasi: "
                    />
                    <CustomText
                        color="errorColor"
                        fontFamily="poppinsMedium"
                        fontSize="md"
                        text={user?.data.unverifiedConsultation.length}
                    />
                </View>
                <View style={{ gap: 10 }}>
                    {sortedUnverifiedConsultations?.map(
                        ({ createdAt, consultationResult, _id }, index) => {
                            const formattedDate = new Date(
                                createdAt,
                            ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            });

                            return (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: Colors.bgErrorColor,
                                        padding: 8,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        borderColor: Colors.errorColor,
                                    }}>
                                    <View>
                                        <CustomText
                                            color="errorColor"
                                            fontFamily="poppinsBold"
                                            fontSize="xs"
                                            text="Hasil sementara: "
                                        />
                                        <CustomText
                                            color="errorColor"
                                            fontFamily="poppinsMedium"
                                            fontSize="xs"
                                            text={
                                                consultationResult.mainPest.name
                                            }
                                        />
                                    </View>
                                    <View row centerV marginT-10>
                                        <CustomText
                                            color="errorColor"
                                            fontFamily="poppinsBold"
                                            fontSize="xs"
                                            text="Tanggal: "
                                        />
                                        <CustomText
                                            color="errorColor"
                                            fontFamily="poppinsMedium"
                                            fontSize="xs"
                                            text={formattedDate}
                                        />
                                    </View>
                                    <View flex center>
                                        <CustomButton
                                            onPress={() => {
                                                navigation.navigate(
                                                    'AdminVerifyConstultationScreen',
                                                    {
                                                        consultationId: _id,
                                                    },
                                                );
                                            }}
                                            text="Verifikasi"
                                            type="primary"
                                        />
                                    </View>
                                </View>
                            );
                        },
                    )}
                </View>
            </View>
        </ScreenLayout>
    );
};

export default UserDetail;
