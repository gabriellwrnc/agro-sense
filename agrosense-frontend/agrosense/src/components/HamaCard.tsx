import React from 'react';
import { Pressable } from 'react-native';
import { Image, View } from 'react-native-ui-lib';
import CustomText from './CustomText';
import { Colors } from '../configs';

type HamaCardProps = {
    name: string;
    italicName: string;
    imageUrl: string;
    onPress: () => void;
};

const HamaCard: React.FC<HamaCardProps> = ({
    imageUrl,
    italicName,
    name,
    onPress,
}) => {
    return (
        <Pressable onPress={onPress}>
            <View
                style={{
                    display: 'flex',
                    backgroundColor: Colors.primaryBgColor,
                    padding: 10,
                    borderRadius: 10,
                    width: 180,
                    height: 280,
                }}>
                <Image
                    source={{
                        uri: imageUrl
                            ? imageUrl
                            : 'https://picsum.photos/id/237/200/300',
                    }}
                    style={{
                        height: 125,
                        borderRadius: 4,
                    }}
                />
                <View
                    style={{
                        paddingVertical: 6,
                        flex: 1,
                        justifyContent: 'flex-start',
                    }}>
                    <View paddingV-4>
                        <CustomText
                            color="ligthTextColor"
                            fontFamily="poppinsBold"
                            fontSize="sm"
                            text={name}
                            ellipsizeMode
                        />
                    </View>
                    <View paddingT-4 paddingB-12>
                        <CustomText
                            color="primaryColor"
                            fontFamily="poppinsMediumItalic"
                            fontSize="sm"
                            text={italicName}
                        />
                    </View>
                    <View
                        flex
                        row
                        centerV
                        style={{
                            gap: 6,
                            alignItems: 'flex-end',
                        }}>
                        <Image
                            source={require('../../assets/images/Small-logo.png')}
                        />
                        <CustomText
                            color="primaryColor"
                            fontFamily="reemkufiBold"
                            fontSize="xxxs"
                            text="Agrosense"
                        />
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default HamaCard;
