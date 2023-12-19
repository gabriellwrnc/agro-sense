import { SearchBar } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomButton, ScreenLayout } from '../../../../components';
import { Colors, FontFamily, FontSize } from '../../../../configs';
import SymptomTable from './components/SymptomTable';
import { useGetAllSymptoms } from '../../../../hooks';
import { Symptom } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';

const SymptomData: React.FC = () => {
    const mutationGetAllSymptom = useGetAllSymptoms();
    const [symptom, setSymptom] = React.useState<Symptom[]>([]);
    const [search, setSearch] = React.useState<string>('');

    const updateSearch = (search: string) => {
        setSearch(search);
    };

    React.useEffect(() => {
        mutationGetAllSymptom.mutate(undefined, {
            onSuccess: resp => {
                setSymptom(resp.data.data);
            },
            onError: err => {
                handleAxiosErr(err);
            },
        });
    }, []);

    return (
        <ScreenLayout backgroundColor="light">
            <View style={{ gap: 26 }}>
                <SearchBar
                    placeholder="Cari Gejala"
                    onChangeText={updateSearch}
                    value={search}
                    platform="android"
                    containerStyle={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.secLigthTextColor,
                        borderRadius: 5,
                    }}
                    inputContainerStyle={{
                        backgroundColor: Colors.secLigthTextColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                    inputStyle={{
                        color: Colors.darkTextColor,
                        fontFamily: FontFamily.poppinsRegular,
                        fontSize: FontSize.md,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                    <CustomButton
                        text="+ Tambah Gejala"
                        onPress={() => {
                            console.log('Tambah Gejala');
                        }}
                        type="primary"
                    />
                </View>
                <SymptomTable symptom={symptom} />
            </View>
        </ScreenLayout>
    );
};

export default SymptomData;
