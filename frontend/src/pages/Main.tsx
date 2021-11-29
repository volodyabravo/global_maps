import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import styled from "@emotion/styled";
import { Button, Container } from '@mui/material';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { ChevronRight } from '@mui/icons-material';

export default function MainPage() {
    return <div>

        <Swiper
            spaceBetween={0}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            navigation={true}
            pagination={true}
        >
            <SwiperSlide>
                <FullscreenSlide>
                    <Background>
                        <img src="https://source.unsplash.com/random/"></img>
                    </Background>
                    <SlideContainer>
                        <div>
                            <Title>Интерьерные <br /> карты и постеры</Title>
                            <ActionButton size="medium" variant="contained" endIcon={<ChevronRight />}> asdsa </ActionButton>
                        </div>
                    </SlideContainer>

                </FullscreenSlide>
            </SwiperSlide>
            <SwiperSlide>
                <FullscreenSlide>
                    <Background>
                        <img src="https://source.unsplash.com/random/"></img>
                    </Background>
                    <SlideContainer>
                        <div>
                            <Title>Интерьерные <br /> карты и постеры</Title>
                            <ActionButton>  </ActionButton>
                        </div>

                    </SlideContainer>

                </FullscreenSlide>
            </SwiperSlide>



        </Swiper>
    </div>
}

const Background = styled("picture")`
    position: absolute;
    top: 0;
    right: 0;   
    left: 0;
    bottom:0; 
    z-index: -1;
    img {
        object-fit:cover;
        height: 100%;
        width:100%;
    }
`

const FullscreenSlide = styled("div")`
    position: relative;
    height: 90vh;
    background-size: cover;
    
`

const SlideContainer = styled(Container)`
  z-index: 1;
  display:flex;
  align-items:center;
  height: 100%;

    
`

const Title = styled("h1")`
    margin-top: 0;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
`

const ActionButton = styled(Button)`

`