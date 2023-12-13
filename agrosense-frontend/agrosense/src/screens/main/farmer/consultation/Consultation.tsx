import React from 'react';
import { StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import { useGetAllSymptoms } from '../../../../hooks';
import { FarmerConsultProps, Symptom } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';

const Consultation: React.FC<FarmerConsultProps> = ({ navigation }) => {
    const mutationGetAllPest = useGetAllSymptoms();
    const [symptoms, setSymptoms] = React.useState<Symptom[]>([]);
    const [selected, setSelected] = React.useState<string[]>([]);

    const structuredSymptoms = symptoms.map(symptom => {
        return {
            label: symptom.name,
            value: symptom.symptomCode,
        };
    });

    React.useEffect(() => {
        mutationGetAllPest.mutate(undefined, {
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
            <View
                flex
                width={'100%'}
                style={{
                    gap: selected.length < 2 ? 18 : 10,
                    paddingBottom: 60,
                }}>
                <View>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="sm"
                        text="Pilihlah gejala dibawah ini yang sesuai dengan jenis kerusakan yang terjadi pada tanaman padi anda:"
                    />
                    {selected.length < 2 && (
                        <CustomText
                            color={
                                selected.length === 1
                                    ? 'errorColor'
                                    : 'primaryColor'
                            }
                            fontFamily="poppinsRegular"
                            fontSize="xs"
                            text="*Pastikan anda memasukkan lebih dari 2 gejala."
                        />
                    )}
                </View>
                <View style={{ gap: 10 }}>
                    {selected.length > 0 && (
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsSemiBold"
                            fontSize="sm"
                            text={`Gejala yang dipilih: ${selected.length}`}
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
                            console.log('selected', selected);
                        }}
                        selectedStyle={styles.selectedStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        itemTextStyle={styles.itemTextStyle}
                    />
                </View>
            </View>
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 20,
                    left: 10,
                }}>
                <CustomButton
                    text="Konsultasi"
                    type="primary"
                    onPress={() => {
                        console.log('Gejala terpilih', selected);
                        navigation.navigate('FarmerConsultResult');
                    }}
                    disable={selected.length < 2}
                />
            </View>
        </ScreenLayout>
    );
};

export default Consultation;

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
