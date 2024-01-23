import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { AdminVerifyCaseSymptomWeightProps } from '../../../../types';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import NumericInput from 'react-native-numeric-input';
import { Colors } from '../../../../configs';
import { useVerifyCase } from '../../../../hooks';
import { handleAxiosErr } from '../../../../utils';

const VerifyCaseSymptomWeight: React.FC<AdminVerifyCaseSymptomWeightProps> = ({
    route,
    navigation,
}) => {
    const { caseCode, pest, symptom } = route.params;
    const mutationVerifyCase = useVerifyCase();

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
        mutationVerifyCase.mutate(
            {
                caseCode,
                pestCode: pest.value,
                symptom: symptomWeights,
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

export default VerifyCaseSymptomWeight;
