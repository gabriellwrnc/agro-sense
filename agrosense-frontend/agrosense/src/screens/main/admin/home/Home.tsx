import { Badge, View } from 'react-native-ui-lib';
import { AdminCardData, ScreenLayout } from '../../../../components';
import {
    useGetAllCase,
    useGetAllFarmers,
    useGetAllPest,
    useGetAllSymptoms,
} from '../../../../hooks';
import React from 'react';
import { handleAxiosErr } from '../../../../utils';
import { AdminHomeProps } from '../../../../types';
import { Colors } from '../../../../configs';

const Home: React.FC<AdminHomeProps> = ({ navigation }) => {
    const mutationGetAllCase = useGetAllCase();
    const mutationGetAllPest = useGetAllPest();
    const mutationGetAllSymptom = useGetAllSymptoms();
    const mutationGetAllFarmer = useGetAllFarmers();
    const [caseDetail, setCaseDetail] = React.useState<{
        unverifiedCaseCount: number;
        caseCount: number;
    }>({
        unverifiedCaseCount: 0,
        caseCount: 0,
    });
    const [pestCount, setPestCount] = React.useState<number>(0);
    const [symptomCount, setSymptomCount] = React.useState<number>(0);
    const [farmerCount, setFarmerCount] = React.useState<number>(0);

    React.useEffect(() => {
        mutationGetAllCase.mutate(undefined, {
            onSuccess: resp => {
                setCaseDetail({
                    unverifiedCaseCount: resp.data.data.unverifiedCaseCount,
                    caseCount: resp.data.data.cases.length,
                });
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
        mutationGetAllPest.mutate(undefined, {
            onSuccess: resp => {
                setPestCount(resp.data.data.length);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
        mutationGetAllSymptom.mutate(undefined, {
            onSuccess: resp => {
                setSymptomCount(resp.data.data.length);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
        mutationGetAllFarmer.mutate(undefined, {
            onSuccess: resp => {
                setFarmerCount(resp.data.data.length);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light">
            <View
                style={{
                    gap: 10,
                }}>
                <View>
                    <AdminCardData
                        onPress={() =>
                            navigation.navigate('AdminCaseDataScreen')
                        }
                        title="Kasus"
                        totalData={caseDetail.caseCount}
                    />
                    {caseDetail.unverifiedCaseCount > 0 && (
                        <View
                            style={{
                                position: 'absolute',
                                right: -6,
                                top: -8,
                            }}>
                            <Badge
                                label={'!'}
                                size={24}
                                backgroundColor={Colors.errorColor}
                            />
                        </View>
                    )}
                </View>
                <AdminCardData
                    onPress={() => navigation.navigate('AdminFarmerDataScreen')}
                    title="Pengguna"
                    totalData={farmerCount}
                />
                <AdminCardData
                    onPress={() => navigation.navigate('AdminPestDataScreen')}
                    title="Hama"
                    totalData={pestCount}
                />
                <AdminCardData
                    onPress={() =>
                        navigation.navigate('AdminSymptomDataScreen')
                    }
                    title="Gejala"
                    totalData={symptomCount}
                />
            </View>
        </ScreenLayout>
    );
};

export default Home;
