import { Formik, FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import {
    CustomButton,
    CustomText,
    CustomTextInput,
    ScreenLayout,
} from '../../../../components';
import { useGetAllSymptoms } from '../../../../hooks';
import { AddPestRequest, AdminAddPestProps, Symptom } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from '../../../../configs';

const AddPest: React.FC<AdminAddPestProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const mutationGetAllSymptoms = useGetAllSymptoms();
    const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);

    console.log('selected', selected);

    const structuredSymptoms = symptoms.map(symptom => {
        return {
            label: symptom.name,
            value: symptom.symptomCode,
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

    React.useEffect(() => {
        mutationGetAllSymptoms.mutate(undefined, {
            onSuccess: resp => {
                setSymptoms(resp.data.data);
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
                onSubmit={(values: AddPestRequest, actions) => {
                    console.log(values);
                }}>
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
                            {selected.length > 0 ? (
                                <CustomText
                                    color="primaryColor"
                                    fontFamily="poppinsSemiBold"
                                    fontSize="xl"
                                    text={`Gejala yang dipilih: ${selected.length}`}
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
                                value={selected}
                                onChange={item => {
                                    setSelected(item);
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
        fontFamily: FontFamily.reemkufiRegular,
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: FontFamily.reemkufiMedium,
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
        fontFamily: FontFamily.reemkufiRegular,
    },
    icon: {
        marginRight: 5,
    },
    itemContainerStyle: {
        backgroundColor: 'white',
    },
    itemTextStyle: {
        fontFamily: FontFamily.reemkufiRegular,
        fontSize: FontSize.sm,
        color: Colors.primaryColor,
    },
});

export default AddPest;
