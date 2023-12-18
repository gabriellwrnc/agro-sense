import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
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
    ROLE,
    ShowPasswordIcon,
    TOKEN,
    removeDataToLocalStorage,
    setDataToLocalStorage,
} from '../../../../configs';
import { useSignIn } from '../../../../hooks';
import {
    farmerDataSlice,
    modalSlice,
    userRootNavDetailsSlice,
} from '../../../../slices';
import {
    FormSignInProps,
    SignInRequest,
    SignInResponse,
} from '../../../../types';
import { handleAxiosErr } from '../../../../utils';
import { AxiosResponse } from 'axios';

const FormSignIn: React.FC<FormSignInProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { hideModal, showModal } = modalSlice.actions;
    const { setFarmerData } = farmerDataSlice.actions;
    const { setLoggedIn } = userRootNavDetailsSlice.actions;
    const mutationSignIn = useSignIn();

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

    const setLocalStorageData = (resp: AxiosResponse<SignInResponse, any>) => {
        removeDataToLocalStorage(TOKEN);
        removeDataToLocalStorage(ROLE);

        setDataToLocalStorage(ROLE, { role: resp.data.data.role });
        setDataToLocalStorage(TOKEN, {
            accessToken: resp.data.accessToken,
            refreshToken: resp.data.refreshToken,
        });
    };

    const handleSignIn = (
        values: SignInRequest,
        actions: FormikHelpers<SignInRequest>,
    ) => {
        let errorText = 'Permintaan gagal';

        mutationSignIn.mutate(values, {
            onSuccess: resp => {
                setLocalStorageData(resp);
                dispatch(
                    showModal({ status: 'success', text: 'Login berhasil' }),
                );
                dispatch(setFarmerData(resp.data.data));
                if (resp.data.data.role === 'farmer') {
                    dispatch(setLoggedIn({ isLoggedIn: true, role: 'farmer' }));
                } else if (resp.data.data.role === 'admin') {
                    dispatch(setLoggedIn({ isLoggedIn: true, role: 'admin' }));
                }
                setTimeout(() => {
                    dispatch(hideModal());
                    actions.setSubmitting(false);
                }, 3000);
            },
            onError: err => {
                handleAxiosErr(err);
                if (err.response?.status === 402) {
                    errorText = 'Email atau password anda salah';
                    actions.setErrors({
                        email: 'Email atau password anda salah',
                        password: 'Email atau password anda salah',
                    });
                } else if (err.response?.status === 401) {
                    errorText = 'Akun tidak ditemukan';
                }
                if (err.response?.status === 500) errorText = 'Server error';
                dispatch(showModal({ status: 'failed', text: errorText }));
                setTimeout(() => {
                    dispatch(hideModal());
                }, 4000);
                actions.setSubmitting(false);
            },
        });
    };

    return (
        <Formik
            initialValues={signInInitialValues}
            onSubmit={handleSignIn}
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
                                onPress={() => navigation.navigate('SignUp')}
                            />
                        </View>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default FormSignIn;
