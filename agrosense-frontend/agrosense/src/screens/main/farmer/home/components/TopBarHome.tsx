import { View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import {
    Colors,
    ROLE,
    TOKEN,
    removeDataToLocalStorage,
} from '../../../../../configs';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { userRootNavDetailsSlice } from '../../../../../slices';

const TopBarHome: React.FC = () => {
    const dispatch = useDispatch();
    const { loggedOut } = userRootNavDetailsSlice.actions;

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
                    text="NamaPengguna!"
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
                }}
            />
        </View>
    );
};

export default TopBarHome;
