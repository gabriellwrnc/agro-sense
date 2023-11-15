import { Formik, FormikHelpers, FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { CustomButton, CustomTextInput } from '../../../../components';
import {
    EmailIcon,
    HidePasswordIcon,
    PasswordIcon,
    PersonIcon,
    PhoneIcon,
    ShowPasswordIcon,
} from '../../../../configs';
import { useSignUp } from '../../../../hooks';
import { modalSlice } from '../../../../slices';
import { FormSignUpProps, SignUpRequest } from '../../../../types';
import { handleAxiosErr } from '../../../../utils';

const FormSignUp: React.FC<FormSignUpProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { hideModal, showModal } = modalSlice.actions;
    const mutationSignUp = useSignUp();
    const [isPasswordVisible, setPasswordVisible] =
        React.useState<boolean>(false);
    const [isPasswordConfirmVisible, setPasswordConfirmVisible] =
        React.useState<boolean>(false);

    const signUpInitialValues: SignUpRequest = {
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        confirmPassword: '',
    };

    const signUpValidationScheme: yup.ObjectSchema<SignUpRequest> = yup
        .object()
        .shape({
            name: yup.string().required('Nama tidak boleh kosong'),
            email: yup
                .string()
                .email('Email tidak valid')
                .required('Email tidak boleh kosong'),
            password: yup
                .string()
                .required('Password tidak boleh kosong')
                .matches(/(?=.*[0-9])/, 'Password harus mengandung angka'),
            phoneNumber: yup
                .string()
                .required('Nomor telepon tidak boleh kosong'),
            confirmPassword: yup
                .string()
                .required('Konfirmasi password tidak boleh kosong')
                .oneOf(
                    [yup.ref('password')],
                    'Konfirmasi password tidak sesuai',
                ),
        });

    const handleSignUp = (
        values: SignUpRequest,
        actions: FormikHelpers<SignUpRequest>,
    ) => {
        let errorText = 'Permintaan gagal';

        mutationSignUp.mutate(values, {
            onSuccess: () => {
                dispatch(
                    showModal({
                        status: 'success',
                        text: 'Pendaftaran berhasil, silahkan masuk.',
                    }),
                );
                navigation.navigate('SignIn');
                setTimeout(() => {
                    dispatch(hideModal());
                    actions.setSubmitting(false);
                }, 4000);
            },
            onError: err => {
                handleAxiosErr(err);
                if (err.response?.status === 409) {
                    errorText = 'Email sudah terdaftar';
                    actions.setErrors({ email: 'Email sudah terdaftar' });
                }
                if (err.response?.status === 400) {
                    errorText = 'Email tidak valid';
                    actions.setErrors({ email: 'Email tidak valid' });
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
            initialValues={signUpInitialValues}
            onSubmit={handleSignUp}
            validationSchema={signUpValidationScheme}>
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                touched,
                errors,
                isSubmitting,
            }: FormikProps<SignUpRequest>) => (
                <>
                    <View style={{ gap: 4 }}>
                        <View style={{ gap: 20 }}>
                            <CustomTextInput
                                icon={<PersonIcon />}
                                placeholder="Masukkan nama anda"
                                onBlur={handleBlur('name')}
                                onChange={handleChange('name')}
                                value={values.name}
                                error={touched.name && errors.name}
                            />
                            <CustomTextInput
                                icon={<EmailIcon />}
                                placeholder="Masukkan email anda"
                                onBlur={handleBlur('email')}
                                onChange={handleChange('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                            />
                            <CustomTextInput
                                icon={<PhoneIcon />}
                                placeholder="Masukkan nomor telepon anda"
                                onBlur={handleBlur('phoneNumber')}
                                onChange={handleChange('phoneNumber')}
                                value={values.phoneNumber}
                                error={
                                    touched.phoneNumber && errors.phoneNumber
                                }
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
                            <CustomTextInput
                                icon={<PasswordIcon />}
                                placeholder="Masukkan ulang password anda"
                                secureTextEntry={!isPasswordConfirmVisible}
                                rightIcon={
                                    isPasswordConfirmVisible ? (
                                        <HidePasswordIcon />
                                    ) : (
                                        <ShowPasswordIcon />
                                    )
                                }
                                onIconTouch={() =>
                                    setPasswordConfirmVisible(
                                        !isPasswordConfirmVisible,
                                    )
                                }
                                onBlur={handleBlur('confirmPassword')}
                                onChange={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                                error={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                }
                            />
                        </View>
                        <View marginT-40>
                            <View
                                style={{
                                    gap: 14,
                                    paddingHorizontal: 30,
                                }}>
                                <CustomButton
                                    text="Daftar"
                                    type="primary"
                                    isSubmitting={isSubmitting}
                                    onPress={() => handleSubmit()}
                                />
                                <CustomButton
                                    text="Masuk"
                                    type="secondary"
                                    onPress={() =>
                                        navigation.navigate('SignIn')
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

export default FormSignUp;
