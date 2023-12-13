import { ListItem } from '@rneui/base';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { CustomText, ScreenLayout } from '../../../../components';
import { Colors } from '../../../../configs';
import { RootState } from '../../../../types';

const ConsultResult: React.FC = () => {
    const [solutionAccordion, setSolutionAccordion] =
        React.useState<boolean>(true);
    const { consultationStatus, mainPest, otherPests } = useSelector(
        (state: RootState) => state.consultationResult,
    );
    const regularName = mainPest.name.replace(/\((.*?)\)/, '').trim();
    const italicNameMatch = /\((.*?)\)/.exec(mainPest.name);
    const italicName = italicNameMatch ? italicNameMatch[0] : '';

    console.log('consultResult', JSON.stringify(consultationStatus, null, 4));
    console.log('consultResult', JSON.stringify(otherPests, null, 4));
    console.log('consultResult', JSON.stringify(mainPest, null, 4));
    return (
        <ScreenLayout backgroundColor="light" flex padding={10}>
            <View center>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="ssm"
                    text="Hama yang menyerang padi anda adalah"
                />
            </View>
            <View center>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="xl"
                    text={regularName}
                />
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsMediumItalic"
                    fontSize="xl"
                    text={italicName}
                />
            </View>
            <View center>
                <CustomText
                    textAlign="center"
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="sm"
                    text="dengan nilai kesamaan dengan kasus sebelumnya sebesar"
                />
            </View>
            <View center>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="xl"
                    text={`${mainPest.similarityPercentage}%`}
                />
            </View>
            <View>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="sm"
                    text={
                        <>
                            <CustomText
                                text="Solusi"
                                color="primaryColor"
                                fontSize="sm"
                                fontFamily="poppinsBold"
                            />
                            <CustomText
                                text={` yang disarankan kepada anda adalah:`}
                                color="primaryColor"
                                fontSize="sm"
                                fontFamily="poppinsRegular"
                            />
                        </>
                    }
                />
            </View>
            <ListItem.Accordion
                content={
                    <CustomText
                        fontFamily="poppinsBold"
                        fontSize="md"
                        color="primaryColor"
                        text="Lihat Instruksi"
                    />
                }
                containerStyle={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: Colors.bgSuccessColor,
                    borderRadius: 6,
                    padding: 16,
                    alignItems: 'center',
                }}
                isExpanded={solutionAccordion}
                onPress={() => {
                    setSolutionAccordion(!solutionAccordion);
                }}>
                <View
                    flex
                    row
                    spread
                    style={{
                        backgroundColor: Colors.primaryBgColor,
                        borderBottomEndRadius: 6,
                        borderBottomStartRadius: 6,
                        // top: -28,
                        // marginBottom: -28,
                        padding: 16,
                    }}>
                    <CustomText
                        fontFamily="poppinsBold"
                        fontSize="md"
                        color="ligthTextColor"
                        text="fsdfasfsadfasdfsadfasdfa"
                    />
                    <CustomText
                        fontFamily="poppinsBold"
                        fontSize="md"
                        color="ligthTextColor"
                        text="fsdfasfsadfasdfsadfasdfa"
                    />
                </View>
            </ListItem.Accordion>
            {mainPest.solution.map((solution, index) => (
                <View key={index}>
                    <CustomText
                        textAlign="justify"
                        color="primaryColor"
                        fontFamily="poppinsRegular"
                        fontSize="sm"
                        text={`- ${solution}`}
                    />
                </View>
            ))}
        </ScreenLayout>
    );
};

export default ConsultResult;
