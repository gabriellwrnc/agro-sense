import React from 'react';
import { Colors, Text, View } from 'react-native-ui-lib';
import { AdminVerifyCaseProps, Pest, Symptom } from '../../../../types';
import { useGetAllPest, useGetAllSymptoms } from '../../../../hooks';
import { handleAxiosErr } from '../../../../utils';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from '../../../../configs';

const VerifyCase: React.FC<AdminVerifyCaseProps> = ({ route, navigation }) => {
    const mutationGetAllSymptoms = useGetAllSymptoms();
    const mutationGetAllPest = useGetAllPest();
    const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
    const [pests, setPest] = React.useState<Pest[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>(
        [],
    );
    const [selectedPests, setSelectedPests] = React.useState<{
        value: string;
        label: string;
    }>();

    const structuredSymptoms = symptoms.map(symptom => {
        return {
            label: symptom.name,
            value: symptom.symptomCode,
        };
    });

    const structuredPests = pests.map(pest => {
        return {
            label: pest.name,
            value: pest.pestCode,
        };
    });

    React.useEffect(() => {
        mutationGetAllSymptoms.mutate(undefined, {
            onSuccess: resp => {
                setSymptoms(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
        mutationGetAllPest.mutate(undefined, {
            onSuccess: resp => {
                setPest(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    console.log('selectedSymptoms', selectedSymptoms);
    console.log('selectedPests', selectedPests);

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View style={{ gap: 10 }}>
                {selectedSymptoms.length > 0 ? (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text={`Gejala yang dipilih: ${selectedSymptoms.length}`}
                    />
                ) : (
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="lg"
                        text="Verifikasi Gejala Hama"
                    />
                )}
                <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    data={structuredSymptoms}
                    labelField="label"
                    valueField="value"
                    placeholder="Pilih gejala"
                    searchPlaceholder="Cari gejala"
                    value={selectedSymptoms}
                    onChange={item => {
                        setSelectedSymptoms(item);
                    }}
                    selectedStyle={styles.selectedStyle}
                    itemContainerStyle={styles.itemContainerStyle}
                    itemTextStyle={styles.itemTextStyle}
                />
            </View>
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
                <CustomButton
                    onPress={() =>
                        navigation.navigate(
                            'AdminVerifyCaseSymptomWeightScreen',
                            {
                                pest: {
                                    label: selectedPests?.label || '',
                                    value: selectedPests?.value || '',
                                },
                                symptom: selectedSymptoms.map(symptom => {
                                    return {
                                        symptomCode: symptom,
                                        weightValue: 0,
                                    };
                                }),
                                caseCode: route.params.caseCode,
                            },
                        )
                    }
                    text="Verifikasi Bobot"
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

export default VerifyCase;
