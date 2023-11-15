import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, FontFamily, FontSize } from '../configs';
import { modalSlice } from '../slices';
import { RootState } from '../types';

const Toast: React.FC = () => {
    const { Toast } = Incubator;
    const dispatch = useDispatch();
    const { visible, status, text } = useSelector(
        (state: RootState) => state.modal,
    );
    const { hideModal } = modalSlice.actions;

    return (
        <Toast
            visible={visible}
            position="top"
            icon={
                status === 'info'
                    ? require('../../assets/images/info.png')
                    : status === 'failed'
                    ? require('../../assets/images/error.png')
                    : require('../../assets/images/success.png')
            }
            message={text}
            swipeable
            messageStyle={{
                fontFamily: FontFamily.reemkufiRegular,
                fontSize: FontSize.md,
                color:
                    status == 'success'
                        ? Colors.boldSuccessColor
                        : status == 'info'
                        ? Colors.boldInfoColor
                        : Colors.boldErrorColor,
            }}
            backgroundColor={
                status == 'success'
                    ? Colors.bgSuccessColor
                    : status == 'info'
                    ? Colors.bgInfoColor
                    : Colors.bgErrorColor
            }
            onDismiss={() => {
                dispatch(hideModal());
            }}
        />
    );
};

export default Toast;
