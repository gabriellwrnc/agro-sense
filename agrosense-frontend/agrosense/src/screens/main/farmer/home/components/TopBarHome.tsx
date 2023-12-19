import { View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import {
    Colors,
    ROLE,
    TOKEN,
    removeDataToLocalStorage,
} from '../../../../../configs';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userRootNavDetailsSlice } from '../../../../../slices';
import { RootState } from '../../../../../types';

const TopBarHome: React.FC = () => {
    const dispatch = useDispatch();
    const { loggedOut } = userRootNavDetailsSlice.actions;
    const { name } = useSelector((state: RootState) => state.farmerData);
    const destructName = name.split(' ');
    const firstName = destructName[0];
    const lastName = destructName[destructName.length - 1];
    const firstNameFirstLetter = firstName[0].toUpperCase();
    const lastNameFirstLetter = lastName[0].toUpperCase();

    return (
        <View
            backgroundColor={Colors.tabBarColor}
            padding-16
            row
            centerV
            spread
            style={{
                borderBottomStartRadius: 24,
                borderBottomEndRadius: 24,
            }}>
            <View style={{ gap: -8 }}>
                <CustomText
                    color="secLigthTextColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="sm"
                    text="Hello,"
                />
                <CustomText
                    color="ligthTextColor"
                    fontFamily="poppinsSemiBold"
                    fontSize="lg"
                    text={`${firstName} ${lastName}!`}
                />
            </View>
            <Pressable
                style={{
                    borderRadius: 200,
                    backgroundColor: Colors.secColor,
                    width: 40,
                    height: 40,
                }}
                onPress={() => {
                    dispatch(loggedOut());
                    removeDataToLocalStorage(TOKEN);
                    removeDataToLocalStorage(ROLE);
                }}>
                <View
                    center
                    style={{
                        width: 40,
                        height: 38,
                    }}>
                    <CustomText
                        color="primaryColor"
                        fontFamily="reemkufiBold"
                        fontSize="lg"
                        text={`${firstNameFirstLetter}${lastNameFirstLetter}`}
                    />
                </View>
            </Pressable>
        </View>
    );
};

export default TopBarHome;
