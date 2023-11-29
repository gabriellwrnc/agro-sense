import { Carousel, Image, View } from 'react-native-ui-lib';
import { Colors } from '../../../../../configs';

const CarouselHome: React.FC = () => {
    const carouselImages = [
        'https://picsum.photos/375/500?random=1',
        'https://picsum.photos/375/500?random=2',
        'https://picsum.photos/375/500?random=3',
    ];

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
            {carouselImages.map((image, index) => {
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
