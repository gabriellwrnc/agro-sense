import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomText, ScreenLayout } from '../../../../components';
import { AdminAddPestSymptomWeightProps } from '../../../../types';

const AddPestSymptomWeight: React.FC<AdminAddPestSymptomWeightProps> = ({
    route,
}) => {
    const { name, description, solutionCodes, symptom } = route.params;
    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View row centerV style={{ gap: 10 }}>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="lg"
                    text="Nama Hama:"
                />
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="md"
                    text={name}
                />
            </View>
            <View>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="lg"
                    text="Deskripsi:"
                />
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="md"
                    text={description}
                />
            </View>
        </ScreenLayout>
    );
};

export default AddPestSymptomWeight;
