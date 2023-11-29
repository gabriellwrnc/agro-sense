import { CustomText, ScreenLayout } from '../../../../components';

const Notif: React.FC = () => {
    return (
        <ScreenLayout backgroundColor="light" flex center>
            <CustomText
                color="primaryColor"
                fontFamily="reemkufiBold"
                fontSize="md"
                text="Fitur dalam tahap pengembangan"
            />
        </ScreenLayout>
    );
};

export default Notif;
