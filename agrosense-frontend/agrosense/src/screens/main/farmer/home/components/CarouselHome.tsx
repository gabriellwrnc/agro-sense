import { Carousel, Image, View } from 'react-native-ui-lib';
import { Colors } from '../../../../../configs';
import { CarouselHomeProps } from '../../../../../types';

const CarouselHome: React.FC<CarouselHomeProps> = ({ imageUrls }) => {
    return (
        <Carousel
            loop
            autoplay
            pagingEnabled
            pageControlPosition={Carousel.pageControlPositions.UNDER}
            // onChangePage={currentPage => {
            //     console.log(currentPage);
            // }}
        >
            {imageUrls.map((image, index) => {
                return (
                    <View
                        key={index}
                        flex
                        style={{
                            borderWidth: 2,
                            borderColor: Colors.secColor,
                            borderRadius: 10,
                        }}>
                        <Image
                            source={{ uri: image }}
                            style={{
                                width: '100%',
                                height: 180,
                                borderRadius: 10,
                            }}
                        />
                    </View>
                );
            })}
        </Carousel>
    );
};

export default CarouselHome;
