import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { userRootNavDetailsSlice } from '../../slices';
import { Colors, Image, View } from 'react-native-ui-lib';
import { CustomText } from '../../components';
import {
    FontFamily,
    FontSize,
    LogoutIcon,
    ROLE,
    TOKEN,
    removeDataToLocalStorage,
} from '../../configs';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const dispatch = useDispatch();
    const { loggedOut } = userRootNavDetailsSlice.actions;

    return (
        <DrawerContentScrollView {...props}>
            <View marginV-26 flex center row style={{ gap: 14 }}>
                <Image
                    source={require('../../../assets/images/medium-logo.png')}
                />
                <CustomText
                    text="Agrosense"
                    fontFamily="reemkufiBold"
                    fontSize="xxl"
                    color="primaryColor"
                />
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Keluar"
                labelStyle={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.ssm,
                    color: Colors.errorColor,
                }}
                icon={() => <LogoutIcon />}
                onPress={() => {
                    dispatch(loggedOut());
                    removeDataToLocalStorage(TOKEN);
                    removeDataToLocalStorage(ROLE);
                }}
            />
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
