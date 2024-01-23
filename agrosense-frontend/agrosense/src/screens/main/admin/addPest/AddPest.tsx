import { Formik, FormikProps } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { View } from 'react-native-ui-lib';
import * as yup from 'yup';
import {
    CustomButton,
    CustomText,
    CustomTextInput,
    ScreenLayout,
} from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import { useGetAllSolution, useGetAllSymptoms } from '../../../../hooks';
import {
    AddPestRequest,
    AdminAddPestProps,
    Solution,
    Symptom,
} from '../../../../types';
import { handleAxiosErr } from '../../../../utils';

const AddPest: React.FC<AdminAddPestProps> = ({ navigation }) => {
    const mutationGetAllSymptoms = useGetAllSymptoms();
    const mutationGetAllSolutions = useGetAllSolution();
    const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
    const [solutions, setSolutions] = React.useState<Solution[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = React.useState<string[]>(
        [],
    );
    const [selectedSolution, setSelectedSolution] = React.useState<string[]>(
        [],
    );

    const structuredSymptoms = symptoms.map(symptom => {
        return {
            label: symptom.name,
            value: symptom.symptomCode,
        };
    });

    const structuredSolutions = solutions.map(solution => {
        return {
            label: solution.name,
            value: solution.solutionCode,
        };
    });

    const addPestInitialValues: AddPestRequest = {
        name: '',
        description: '',
        solutionCodes: [],
        symptom: [],
    };

    const addPestValidationScheme: yup.ObjectSchema<AddPestRequest> = yup
        .object()
        .shape({
            name: yup.string().required('Nama tidak boleh kosong'),
            description: yup.string().required('Deskripsi tidak boleh kosong'),
            solutionCodes: yup.array().required('Solusi tidak boleh kosong'),
            symptom: yup.array().required('Gejala tidak boleh kosong'),
        });

    const handleSubmit = (value: AddPestRequest) => {
        navigation.navigate('AdminAddPestSymptomWeightScreen', {
            name: value.name,
            description: value.description,
            solutionCodes: selectedSolution,
            symptom: selectedSymptoms.map(symptom => {
                return {
                    symptomCode: symptom,
                    weightValue: 0,
                };
            }),
        });
    };

    React.useEffect(() => {
        mutationGetAllSymptoms.mutate(undefined, {
            onSuccess: resp => {
                setSymptoms(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
        mutationGetAllSolutions.mutate(undefined, {
            onSuccess: resp => {
                setSolutions(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <Formik
                initialValues={addPestInitialValues}
                validationSchema={addPestValidationScheme}
                onSubmit={handleSubmit}>
                {(props: FormikProps<AddPestRequest>) => (
                    <View style={{ gap: 10 }}>
                        <View style={{ gap: 6 }}>
                            <CustomText
                                color="primaryColor"
                                fontFamily="reemkufiBold"
                                fontSize="xl"
                                text={'Nama Hama'}
                            />
                            <CustomTextInput
                                placeholder="Masukkan nama hama"
                                onChange={props.handleChange('name')}
                                value={props.values.name}
                                error={props.touched.name && props.errors.name}
                            />
                        </View>
                        <View style={{ gap: 6 }}>
                            <CustomText
                                color="primaryColor"
                                fontFamily="reemkufiBold"
                                fontSize="xl"
                                text={'Deskripsi Hama'}
                            />
                            <CustomTextInput
                                placeholder="Masukkan deskripsi hama"
                                onChange={props.handleChange('description')}
                                multiline
                                value={props.values.description}
                                error={
                                    props.touched.description &&
                                    props.errors.description
                                }
                            />
                        </View>
                        <View style={{ gap: 10 }}>
                            {selectedSymptoms.length > 0 ? (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsSemiBold"
                                    fontSize="xl"
                                    text={`Gejala yang dipilih: ${selectedSymptoms.length}`}
                                />
                            ) : (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsSemiBold"
                                    fontSize="xl"
                                    text="Gejala Hama"
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
                                    props.setFieldValue(
                                        'symptom',
                                        selectedSymptoms,
                                    );
                                }}
                                selectedStyle={styles.selectedStyle}
                                itemContainerStyle={styles.itemContainerStyle}
                                itemTextStyle={styles.itemTextStyle}
                            />
                        </View>
                        <View style={{ gap: 10 }}>
                            {selectedSolution.length > 0 ? (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsSemiBold"
                                    fontSize="xl"
                                    text={`Solusi yang dipilih: ${selectedSolution.length}`}
                                />
                            ) : (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsSemiBold"
                                    fontSize="xl"
                                    text="Solusi dari Hama"
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
                                valueField="value"
                                placeholder="Pilih solusi"
                                searchPlaceholder="Cari solusi"
                                value={selectedSolution}
                                onChange={item => {
                                    setSelectedSolution(item);
                                    props.setFieldValue(
                                        'symptom',
                                        selectedSolution,
                                    );
                                }}
                                selectedStyle={styles.selectedStyle}
                                itemContainerStyle={styles.itemContainerStyle}
                                itemTextStyle={styles.itemTextStyle}
                            />
                        </View>
                        <CustomButton
                            text="Tambah Hama"
                            type="primary"
                            onPress={props.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
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

export default AddPest;
