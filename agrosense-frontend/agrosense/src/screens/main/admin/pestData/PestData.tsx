import { CustomText, ScreenLayout } from '../../../../components';

const PestData: React.FC = () => {
    return (
        <ScreenLayout backgroundColor="light" flex center>
            <CustomText
                color="primaryColor"
                fontFamily="reemkufiBold"
                fontSize="md"
                text="Fitur PestData dalam tahap pengembangan"
            />
        </ScreenLayout>
    );
};

export default PestData;
