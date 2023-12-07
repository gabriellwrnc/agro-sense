import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import { FarmerConsultProps } from '../../../../types';

const Consultation: React.FC<FarmerConsultProps> = ({ navigation }) => {
    const [selected, setSelected] = React.useState([]);

    const data: {
        key: string;
        value: string;
        disabled?: boolean;
    }[] = [
        {
            key: '1',
            value: 'Pada fase anakan jumlah anakan berkurang',
        },
        {
            key: '2',
            value: 'Di daerah sekitar lubang bekas hisapan berubah warna menjadi coklat menyerupai gejala penyakit blas',
        },
        {
            key: '3',
            value: 'Adanya ngengat di pertanaman dan larva di dalam batang padi',
        },
        {
            key: '5',
            value: 'Adanya beluk (malai hampa) pada tanaman stadia generative',
        },
        {
            key: '6',
            value: 'Anakan mati yang disebut sundep pada tanaman stadia vegetative',
        },
        {
            key: '7',
            value: 'Warna tanaman berubah coklat kemerahan atau kuning',
        },
        {
            key: '7',
            value: 'Warna tanaman berubah coklat kemerahan atau kuning',
        },
        {
            key: '7',
            value: 'Warna tanaman berubah coklat kemerahan atau kuning',
        },
        {
            key: '7',
            value: 'Warna tanaman berubah coklat kemerahan atau kuning',
        },
    ];

    return (
        <ScreenLayout backgroundColor="light" flex center padding={10}>
            <View
                flex
                width={'100%'}
                style={{ gap: 26, justifyContent: 'center' }}>
                <View>
                    <CustomText
                        color="primaryColor"
                        fontFamily="poppinsSemiBold"
                        fontSize="sm"
                        text="Pilihlah gejala dibawah ini yang sesuai dengan jenis kerusakan yang terjadi pada tanaman padi anda:"
                    />
                    {selected.length < 2 && (
                        <CustomText
                            color={
                                selected.length === 1
                                    ? 'errorColor'
                                    : 'primaryColor'
                            }
                            fontFamily="poppinsRegular"
                            fontSize="xs"
                            text="*Pastikan anda memasukkan lebih dari 2 gejala."
                        />
                    )}
                </View>
                <View
                    flex
                    style={{
                        justifyContent: 'center',
                        zIndex: 1,
                    }}>
                    <MultipleSelectList
                        setSelected={(val: any) => {
                            console.log('val', val);
                            setSelected(val);
                        }}
                        data={data}
                        placeholder="Pilih gejala"
                        searchPlaceholder="Cari gejala"
                        boxStyles={{
                            borderColor: Colors.primaryColor,
                            borderRadius: 10,
                            borderWidth: 2,
                            alignItems: 'center',
                            backgroundColor: Colors.bgColor,
                        }}
                        inputStyles={{
                            color: Colors.darkTextColor,
                            fontFamily: FontFamily.poppinsRegular,
                            fontSize: FontSize.sm,
                        }}
                        dropdownTextStyles={{
                            color: Colors.darkTextColor,
                            fontFamily: FontFamily.poppinsMedium,
                            fontSize: FontSize.sm,
                        }}
                        dropdownStyles={{
                            borderColor: Colors.primaryColor,
                            backgroundColor: Colors.bgColor,
                        }}
                        checkBoxStyles={{
                            borderColor: Colors.primaryColor,
                            borderWidth: 2,
                        }}
                        badgeStyles={{
                            backgroundColor: Colors.tabBarColor,
                        }}
                        labelStyles={{
                            color: Colors.primaryColor,
                            fontFamily: FontFamily.poppinsSemiBold,
                            fontSize: FontSize.sm,
                        }}
                        badgeTextStyles={{
                            fontFamily: FontFamily.poppinsRegular,
                            fontSize: FontSize.xs,
                        }}
                        save="key"
                        maxHeight={490}
                        onSelect={() => console.log('selected', selected)}
                        label={`Jumlah gejala yang dipilih: ${selected.length}`}
                        notFoundText="Tidak ada gejala yang ditemukan."
                    />
                </View>
                <View
                    style={{
                        justifyContent: 'flex-end',
                    }}>
                    <CustomButton
                        text="Konsultasi"
                        type="primary"
                        onPress={() => {
                            console.log('Gejala terpilih', selected);
                            navigation.navigate('FarmerConsultResult');
                        }}
                        disable={selected.length < 2}
                    />
                </View>
            </View>
        </ScreenLayout>
    );
};

export default Consultation;
