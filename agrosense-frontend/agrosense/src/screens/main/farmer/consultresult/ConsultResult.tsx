import { Icon, ListItem } from '@rneui/base';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Colors } from '../../../../configs';
import { FarmerConsultResultProps, RootState } from '../../../../types';

const ConsultResult: React.FC<FarmerConsultResultProps> = ({ navigation }) => {
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
        <>
            <ScreenLayout backgroundColor="light" padding={10}>
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
                {mainPest.similarityPercentage < 60 && (
                    <View
                        style={{
                            backgroundColor: Colors.bgErrorColor,
                            borderWidth: 1,
                            borderColor: Colors.errorColor,
                            padding: 10,
                            borderRadius: 6,
                            marginTop: 20,
                        }}>
                        <CustomText
                            textAlign="justify"
                            color="errorColor"
                            fontFamily="poppinsSemiBold"
                            fontSize="sm"
                            text="Ini hanya hasil sementara karena, konsultasi anda merupakan kasus baru, silahkan menunggu hasil konsultasi terbaru pada halaman riwayat konsultasi. "
                        />
                    </View>
                )}
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
            <View
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bottom: 30,
                    width: '100%',
                    paddingHorizontal: 10,
                }}>
                <CustomButton
                    onPress={() => navigation.replace('FarmerConsult')}
                    text="Konsultasi Ulang"
                    type="primary"
                />
                <CustomButton
                    onPress={() => navigation.navigate('FarmerHistory')}
                    text="Riwayat Konsultasi"
                    type="primary"
                />
            </View>
        </>
    );
};

export default ConsultResult;
