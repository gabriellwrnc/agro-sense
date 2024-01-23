import React from 'react';
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { CustomText, ScreenLayout } from '../../../../components';
import { Colors } from '../../../../configs';
import { useGetUserByEmail } from '../../../../hooks';
import { GetFarmerByEmailResponse, RootState } from '../../../../types';
import { getTimeAgo } from '../../../../utils/getTimeAgo';

const History: React.FC = () => {
    const { email } = useSelector((state: RootState) => state.farmerData);
    const mutationGetUserByEmail = useGetUserByEmail(email);
    const [user, setUser] = React.useState<GetFarmerByEmailResponse>();
    const sortedConsultations = user?.data.consultations.sort((a, b) => {
        return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
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
        <ScreenLayout backgroundColor="light">
            <View style={{ gap: 10 }}>
                {sortedConsultations?.map((consultation, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                padding: 10,
                                borderWidth: 1,
                                borderColor: Colors.primaryColor,
                                borderRadius: 5,
                            }}>
                            <View flex style={{ alignItems: 'flex-end' }}>
                                <CustomText
                                    color="greyColor"
                                    fontFamily="poppinsBold"
                                    fontSize="xs"
                                    text={getTimeAgo(
                                        new Date(consultation.createdAt),
                                    )}
                                />
                            </View>
                            <View>
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsBold"
                                    fontSize="sm"
                                    text="Hama hasil konsul: "
                                />
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsMedium"
                                    fontSize="sm"
                                    text={
                                        consultation.consultationResult.mainPest
                                            .name
                                    }
                                />
                            </View>
                            <View row>
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsBold"
                                    fontSize="sm"
                                    text="Status: "
                                />
                                {consultation.consultationResult.status ===
                                'oldCase' ? (
                                    <CustomText
                                        color="primaryColor"
                                        fontFamily="poppinsMedium"
                                        fontSize="sm"
                                        text="Terverifikasi"
                                    />
                                ) : (
                                    <CustomText
                                        color="errorColor"
                                        fontFamily="poppinsMedium"
                                        fontSize="sm"
                                        text="Belum terverifikasi"
                                    />
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScreenLayout>
    );
};

export default History;
