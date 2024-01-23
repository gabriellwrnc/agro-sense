import React from 'react';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { Image, View } from 'react-native-ui-lib';
import { CustomButton, CustomText, ScreenLayout } from '../../../../components';
import { AdminAddPestImageProps } from '../../../../types';
import { useAddPest, useAddPestImage } from '../../../../hooks';
import { handleAxiosErr } from '../../../../utils';

const AddPestImage: React.FC<AdminAddPestImageProps> = ({
    route,
    navigation,
}) => {
    const { description, name, solutionCodes, symptom } = route.params;
    const mutationAddPest = useAddPest();
    const mutationAddPestImage = useAddPestImage();
    const [selectedImage, setSelectedImage] = React.useState<ImageOrVideo>();

    const handleOpenImagePicker = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            });
            setSelectedImage(image);
        } catch (error) {
            console.log('Error selecting Image', error);
        }
    };
    console.log(selectedImage?.mime);
    const handleSubmit = () => {
        mutationAddPest.mutate(
            {
                name,
                description,
                solutionCodes,
                symptom,
            },
            {
                onSuccess: resp => {
                    console.log(resp.data.data.pest.pestCode);
                    const formData = new FormData();

                    formData.append('pestCode', 'H-11');
                    formData.append('image', {
                        uri: selectedImage?.path,
                        type: selectedImage?.mime,
                        name: 'image',
                    });

                    mutationAddPestImage.mutate(formData, {
                        onSuccess: resp => {
                            console.log(resp.data);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'AdminHomeDrawer' }],
                            });
                        },
                        onError: error => {
                            handleAxiosErr(error);
                        },
                    });
                },
                onError: error => {
                    handleAxiosErr(error);
                },
            },
        );
    };

    return (
        <ScreenLayout backgroundColor="light" padding={10}>
            <View>
                <CustomText
                    color="primaryColor"
                    fontFamily="poppinsBold"
                    fontSize="md"
                    text="Gambar hama"
                />
                {!selectedImage && (
                    <CustomButton
                        onPress={handleOpenImagePicker}
                        text="Pilih Gambar"
                        type="primary"
                    />
                )}
                {selectedImage && (
                    <View flex marginT-20 style={{ gap: 10 }}>
                        <View flex center>
                            <Image
                                source={{
                                    uri: selectedImage.path
                                        ? selectedImage.path
                                        : 'https://picsum.photos/id/237/200/300',
                                }}
                                style={{ width: 280, height: 360 }}
                            />
                        </View>
                        <CustomButton
                            onPress={handleSubmit}
                            text="Simpan Hama"
                            type="primary"
                        />
                    </View>
                )}
            </View>
        </ScreenLayout>
    );
};

export default AddPestImage;
