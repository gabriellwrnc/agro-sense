import { View } from 'react-native-ui-lib';
import { CustomText } from '../../../../../components';
import { Colors } from '../../../../../configs';

const TopBarHome: React.FC = () => {
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
            <View
                backgroundColor={Colors.secColor}
                width={40}
                height={40}
                style={{ borderRadius: 200 }}
            />
        </View>
    );
};

export default TopBarHome;
