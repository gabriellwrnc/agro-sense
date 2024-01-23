import React from 'react';
import NumericInput from 'react-native-numeric-input';
import { View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Colors } from '../../../../configs';
import { AdminAddPestSymptomWeightProps } from '../../../../types';

const AddPestSymptomWeight: React.FC<AdminAddPestSymptomWeightProps> = ({
    route,
    navigation,
}) => {
    const { name, description, solutionCodes, symptom } = route.params;
    const [symptomWeights, setSymptomWeights] = React.useState<
        {
            symptomCode: string;
            weightValue: number;
        }[]
    >(symptom);

    const updateWeightValue = (symptomCode: string, value: number) => {
        const updatedSymptomWeights = symptomWeights.map(symptom =>
            symptom.symptomCode === symptomCode
                ? { ...symptom, weightValue: value }
                : symptom,
        );
        setSymptomWeights(updatedSymptomWeights);
    };

    const handleSubmit = () => {
        console.log(symptomWeights);
        navigation.navigate('AdminAddPestImageScreen', {
            name,
            description,
            solutionCodes,
            symptom: symptomWeights,
        });
    };

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View row centerV style={{ gap: 10 }}>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="md"
                    text="Nama Hama:"
                />
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="sm"
                    text={name}
                />
            </View>
            <View>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="md"
                    text="Deskripsi:"
                />
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="sm"
                    text={description}
                />
            </View>
            <View marginT-14>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsMedium"
                    fontSize="sm"
                    text="Berikan bobot pada gejala dibawah ini:"
                />
            </View>
            <View flex centerH>
                {symptomWeights.map(({ symptomCode }, index) => {
                    return (
                        <View key={index} marginT-14>
                            <CustomText
                                color="primaryColor"
                                fontFamily="poppinsSemiBold"
                                fontSize="md"
                                text={symptomCode}
                            />
                            <NumericInput
                                onChange={value =>
                                    updateWeightValue(symptomCode, value)
                                }
                                rounded
                                minValue={0}
                                maxValue={1}
                                step={0.1}
                                valueType="real"
                                containerStyle={{
                                    borderColor: Colors.primaryColor,
                                }}
                                inputStyle={{
                                    borderColor: Colors.primaryColor,
                                }}
                                rightButtonBackgroundColor={
                                    Colors.softGreyColor
                                }
                                leftButtonBackgroundColor={Colors.softGreyColor}
                            />
                        </View>
                    );
                })}
            </View>
            <CustomButton onPress={handleSubmit} text="Tambah" type="primary" />
        </ScreenLayout>
    );
};

export default AddPestSymptomWeight;
