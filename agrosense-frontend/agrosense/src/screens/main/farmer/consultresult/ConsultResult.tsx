import { Icon, ListItem } from '@rneui/base';
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
        <ScreenLayout backgroundColor="light" padding={10}>
            {mainPest.similarityPercentage > 60 ? (
                <View
                    flex
                    row
                    style={{
                        backgroundColor: Colors.bgSuccessColor,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="ssm"
                        text="Kondisi padi anda sehat"
                    />
                </View>
            ) : (
                <View
                    flex
                    row
                    style={{
                        backgroundColor: Colors.bgErrorColor,
                        borderWidth: 1,
                        borderColor: Colors.errorColor,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="ssm"
                        text="Kondisi padi anda sakit"
                    />
                </View>
            )}
            <View center>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="ssm"
                    text="Hama yang menyerang padi anda adalah"
                />
            </View>
            <View center marginT-30>
                <CustomText
                    color={
                        mainPest.similarityPercentage > 60
                            ? 'boldSuccessColor'
                            : 'errorColor'
                    }
                    fontFamily="poppinsBold"
                    fontSize="xl"
                    text={regularName}
                />
                <CustomText
                    color={
                        mainPest.similarityPercentage > 60
                            ? 'boldSuccessColor'
                            : 'errorColor'
                    }
                    fontFamily="poppinsMediumItalic"
                    fontSize="xl"
                    text={italicName}
                />
            </View>
            <View center marginT-30>
                <CustomText
                    textAlign="center"
                    color="primaryColor"
                    fontFamily="poppinsRegular"
                    fontSize="sm"
                    text="dengan presentase kesamaan dengan kasus sebelumnya pada database kami sebesar"
                />
            </View>
            <View center marginT-20>
                <CustomText
                    color={
                        mainPest.similarityPercentage > 60
                            ? 'boldSuccessColor'
                            : 'errorColor'
                    }
                    fontFamily="poppinsBold"
                    fontSize="xl"
                    text={`${mainPest.similarityPercentage}%`}
                />
            </View>
            <ListItem.Accordion
                content={
                    <CustomText
                        fontFamily="poppinsBold"
                        fontSize="md"
                        color="primaryColor"
                        text="Solusi"
                    />
                }
                containerStyle={{
                    justifyContent: 'space-between',
                    backgroundColor: Colors.bgSuccessColor,
                    borderRadius: 6,
                    marginTop: 20,
                    alignItems: 'center',
                }}
                icon={
                    <Icon
                        name="chevron-down"
                        type="feather"
                        color={Colors.primaryColor}
                    />
                }
                isExpanded={solutionAccordion}
                onPress={() => {
                    setSolutionAccordion(!solutionAccordion);
                }}>
                <View
                    style={{
                        backgroundColor: Colors.primaryBgColor,
                        borderBottomEndRadius: 6,
                        borderBottomStartRadius: 6,
                        padding: 16,
                    }}>
                    {mainPest.solution.map(solution => {
                        return (
                            <View key={solution}>
                                <CustomText
                                    textAlign="justify"
                                    color="ligthTextColor"
                                    fontFamily="poppinsMedium"
                                    fontSize="sm"
                                    text={`* ${solution}`}
                                />
                            </View>
                        );
                    })}
                </View>
            </ListItem.Accordion>
        </ScreenLayout>
    );
};

export default ConsultResult;
