import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native-ui-lib';
import * as yup from 'yup';
import {
    CustomButton,
    CustomText,
    CustomTextInput,
} from '../../../../components';
import {
    EmailIcon,
    HidePasswordIcon,
    PasswordIcon,
    ShowPasswordIcon,
} from '../../../../configs';
import { FormSignInProps, SignInRequest } from '../../../../types';

const FormSignIn: React.FC<FormSignInProps> = ({ navigation }) => {
    const [isPasswordVisible, setPasswordVisible] =
        React.useState<boolean>(false);

    const signInInitialValues: SignInRequest = {
        email: '',
        password: '',
    };

    const signInValidationScheme: yup.ObjectSchema<SignInRequest> = yup
        .object()
        .shape({
            email: yup
                .string()
                .email('Email tidak valid')
                .required('Email tidak boleh kosong'),
            password: yup.string().required('Password tidak boleh kosong'),
        });
    return (
        <Formik
            initialValues={signInInitialValues}
            onSubmit={(
                values: SignInRequest,
                actions: FormikHelpers<SignInRequest>,
            ) => {
                console.log('values', values);
                setTimeout(() => {
                    actions.setSubmitting(false);
                    navigation.navigate('FarmerScreenStacks');
                }, 1000);
            }}
            validationSchema={signInValidationScheme}>
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                touched,
                errors,
                isSubmitting,
            }: FormikProps<SignInRequest>) => (
                <>
                    <View style={{ gap: 4 }}>
                        <View style={{ gap: 20 }}>
                            <CustomTextInput
                                icon={<EmailIcon />}
                                placeholder="Masukkan nomor/email anda"
                                onBlur={handleBlur('email')}
                                onChange={handleChange('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                            />
                            <CustomTextInput
                                icon={<PasswordIcon />}
                                placeholder="Masukkan password anda"
                                secureTextEntry={!isPasswordVisible}
                                rightIcon={
                                    isPasswordVisible ? (
                                        <HidePasswordIcon />
                                    ) : (
                                        <ShowPasswordIcon />
                                    )
                                }
                                onIconTouch={() =>
                                    setPasswordVisible(!isPasswordVisible)
                                }
                                onBlur={handleBlur('password')}
                                onChange={handleChange('password')}
                                value={values.password}
                                error={touched.password && errors.password}
                            />
                        </View>
                        <View style={{ gap: 40 }}>
                            <Pressable style={{ alignSelf: 'flex-end' }}>
                                <CustomText
                                    color="greyColor"
                                    fontFamily="poppinsRegular"
                                    fontSize="sm"
                                    text="Lupa password?"
                                />
                            </Pressable>
                            <View
                                style={{
                                    gap: 14,
                                    paddingHorizontal: 30,
                                }}>
                                <CustomButton
                                    text="Masuk"
                                    type="primary"
                                    isSubmitting={isSubmitting}
                                    onPress={() => handleSubmit()}
                                />
                                <CustomButton
                                    text="Daftar"
                                    type="secondary"
                                    onPress={() =>
                                        navigation.navigate('SignUp')
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </>
            )}
        </Formik>
    );
};

export default FormSignIn;
