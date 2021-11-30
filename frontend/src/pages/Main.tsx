import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import styled from "@emotion/styled";
import { Button, Container } from '@mui/material';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import { ChevronRight } from '@mui/icons-material';

import rostov from "./../assets/main/rostov.png"
import starry from "./../assets/main/starry.png"
import mapspromo from "./../assets/main/mapspromo.jpg"
import { Link } from 'react-router-dom';

export default function MainPage() {
    return <div>

        <Swiper
            spaceBetween={0}
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            // navigation={true}
            pagination={true}
        >
            <SwiperSlide>
                <FullscreenSlide>
                    <Background>
                        <img src={mapspromo} alt=""></img>
                    </Background>
                    <SlideContainer>
                        <div>
                            <Title>Интерьерные <br /> карты и постеры</Title>
                            <a href="#pricing">
                                <ActionButton size="large" variant="contained" endIcon={<ChevronRight />}>Создать постер</ActionButton>
                            </a>
                        </div>
                    </SlideContainer>

                </FullscreenSlide>
            </SwiperSlide>

        </Swiper>
        <Pricing id="pricing">
            <h2>Типы карт и постеров</h2>
            <p>Создавайте индивидуальные карты путешествий<br /> и постеры лучших моментов вашей жизни</p>
            <div className="goods">
                <PricingItem>
                    <div className="top-part">
                        <div className="image">
                            <img src={rostov} alt="" />
                        </div>
                        <div className="description">
                            <span>Карта города</span>
                            <span>от 490 ₽</span>
                        </div>
                    </div>
                    <div className="bottom-part">
                        <Link to="/street/">
                            <ActionButton size="large" variant="contained" endIcon={<ChevronRight />}> Создать карту </ActionButton>
                        </Link>
                    </div>
                </PricingItem>
                <PricingItem>
                    <div className="top-part">
                        <div className="image">
                            <img src={starry} alt="" />
                        </div>
                        <div className="description">
                            <span>Звездное небо</span>
                            <span>от 490 ₽</span>
                        </div>
                    </div>
                    <div className="bottom-part">
                        <Link to="/star/">
                            <ActionButton size="large" variant="contained" endIcon={<ChevronRight />}> Создать карту </ActionButton>
                        </Link>
                    </div>
                </PricingItem>

            </div>
        </Pricing>
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
    margin-bottom: 1.5em;
`
const ActionButton = styled(Button)`
    text-decoration:none;
    background: #202945;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;    
    border-radius: 0;
    &:hover {
        background: #202945;
    }
`

const ActionGrayButton = styled(Button)`
text-decoration:none;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;    
    background: #E6EAEE;
    border-radius: 0;
    color: #202945;
    &:hover {
        background: #E6EAEE;
    }
`

const Pricing = styled(Container)`
    padding: 4em 0;
    position: relative;
    background-size: cover;
    h2 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 25px;
        
        /* or 125% */
        text-align: center;
    }
    p {
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;

        /* or 125% */
        text-align: center;
    }
    .goods {
        display:flex;
        align-items: space-between;
        ${({theme})=> theme.breakpoints.down("md")} {
            flex-direction: column;
            align-items: center;
        }
    }
`

const PricingItem = styled("div")`
    padding: 10px;
    flex-basis: 25%;
    .top-part {
        background: #F8F8F8;
        display: block;
        padding: 10px;

        .image {
            display: flex;
            justify-content: center;
        }
        .description {
            width: 100%;
            display: flex;
            align-content: space-between;
            justify-content: space-between;
        }
    }

    .bottom-part {
        display: flex;
        justify-content: center;
        padding-top: 20px;
    }
`