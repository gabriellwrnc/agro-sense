import React from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import {
    AdminVerifyConstultationProps,
    Pest,
    Solution,
} from '../../../../types';
import {
    useGetAllPest,
    useGetAllSolution,
    useVerifyConsultation,
} from '../../../../hooks';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../../../configs';
import { handleAxiosErr } from '../../../../utils';

const VerifyConstultation: React.FC<AdminVerifyConstultationProps> = ({
    navigation,
    route,
}) => {
    const { consultationId } = route.params;
    const mutationGetAllPest = useGetAllPest();
    const mutationGetAllSolutions = useGetAllSolution();
    const mutationVerifyConsultation = useVerifyConsultation();
    const [pests, setPest] = React.useState<Pest[]>([]);
    const [solutions, setSolutions] = React.useState<Solution[]>([]);
    const [selectedSolution, setSelectedSolution] = React.useState<string[]>(
        [],
    );
    const [selectedPests, setSelectedPests] = React.useState<{
        value: string;
        label: string;
    }>();
    const structuredPests = pests.map(pest => {
        return {
            label: pest.name,
            value: pest.pestCode,
        };
    });
    const structuredSolutions = solutions.map(solution => {
        return {
            label: solution.name,
            value: solution.solutionCode,
        };
    });

    React.useEffect(() => {
        mutationGetAllPest.mutate(undefined, {
            onSuccess: resp => {
                setPest(resp.data.data);
            },
            onError: err => {
                console.log(err);
            },
        });
        mutationGetAllSolutions.mutate(undefined, {
            onSuccess: resp => {
                setSolutions(resp.data.data);
            },
            onError: err => {
                console.log(err);
            },
        });
    }, []);

    const handleSubmit = () => {
        console.log(selectedSolution);
        console.log(selectedPests);
        console.log(consultationId);
        mutationVerifyConsultation.mutate(
            {
                consultationId: consultationId,
                consultationResult: {
                    mainPest: {
                        name: selectedPests?.label || '',
                        solution: selectedSolution,
                    },
                    status: 'oldCase',
                },
            },
            {
                onSuccess: resp => {
                    console.log(resp);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AdminHomeDrawer' }],
                    });
                },
                onError: err => {
                    handleAxiosErr(err);
                },
            },
        );
    };

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View style={{ gap: 10 }}>
                {selectedPests?.label ? (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text={`Hama yang dipilih: ${selectedPests.label}`}
                    />
                ) : (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text="Verifikasi Hama"
                    />
                )}
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={structuredPests}
                    labelField="label"
                    valueField="value"
                    placeholder="Pilih hama"
                    searchPlaceholder="Cari hama"
                    onChange={item => {
                        setSelectedPests(item);
                    }}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.itemTextStyle}
                />
            </View>
            <View marginT-20 style={{ gap: 10 }}>
                {selectedSolution.length > 0 ? (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text={`Solusi yang dipilih: ${selectedSolution.length}`}
                    />
                ) : (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text="Verifikasi Solusi"
                    />
                )}
                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={structuredSolutions}
                    labelField="label"
                    valueField="label"
                    placeholder="Pilih solusi"
                    searchPlaceholder="Cari solusi"
                    value={selectedSolution}
                    onChange={item => {
                        setSelectedSolution(item);
                    }}
                    selectedStyle={styles.selectedStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.itemTextStyle}
                />
            </View>
            <View marginT-30>
                <CustomButton
                    onPress={handleSubmit}
                    text="Verifikasi"
                    type="primary"
                />
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.primaryColor,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: FontFamily.poppinsRegular,
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: FontFamily.poppinsMedium,
        color: Colors.primaryColor,
    },
    selectedStyle: {
        borderRadius: 12,
        padding: 10,
        borderWidth: 1.5,
        borderColor: Colors.greyColor,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
        fontFamily: FontFamily.poppinsRegular,
    },
    icon: {
        marginRight: 5,
    },
    itemContainerStyle: {
        backgroundColor: 'white',
    },
    itemTextStyle: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.sm,
        color: Colors.primaryColor,
    },
});

export default VerifyConstultation;
