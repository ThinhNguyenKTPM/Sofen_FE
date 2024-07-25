import {Flex} from "antd";
import {Title} from "components/typhograpy/Title.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {Text} from "components/typhograpy/Text.tsx";
import {Button} from "components/button/Button.tsx";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Currency} from "components/currency/Currency.tsx";
import {HotelDetailResponse} from "public/models/Hotel.ts";

export interface HotelCardContentProps {
    hotelDetail?: HotelDetailResponse;
    isDetailHotel?: boolean;
    screenSize?: "screen-sm" | "screen-md" | "screen-lg" | "screen-xl";
}

export const HotelCardContent = (
    {hotelDetail, isDetailHotel, screenSize}: HotelCardContentProps
) => {
    const {t} = useTranslation();

    const className = {
        hotelCardInfo: "hotel-card-info",
        hotelCardInfoLeftDetail: "hotel-card-info-left",
        hotelCardRating: "hotel-card-rating",
        hotelCardServices: "hotel-card-services",
        hotelCardPrice: "hotel-card-price",
    };
    if(isDetailHotel){
        className.hotelCardInfoLeftDetail = "hotel-card-info-left is-detail-hotel";
        className.hotelCardPrice = "hotel-card-price is-detail-hotel";
    }

    const hotelServices = hotelDetail?.services;

    return (
        <StyledHotelCard className={`hotel-card-info ${screenSize}`} vertical={true}>
            <Title level={3} color={"red"}>
                {hotelDetail?.hotelName}
            </Title>
            <Flex vertical={!isDetailHotel}>
                <div className={className.hotelCardInfoLeftDetail}>
                    <div className={"hotel-card-rating"}>
                        {Array.from({length: 5}).map((_, index) => (
                            <img key={index} src={"src/assets/star.svg"} alt={""}/>
                        ))}
                    </div>
                    <Paragraph color={appConfig.colors.txt} fontSize={"14px"}>
                        {hotelDetail?.hotelAddress}
                    </Paragraph>
                    <div className={"hotel-card-services"}>
                        {hotelServices?.map((service, index) => (
                            <span key={index}>
                                <img src={"src/assets/Hotel/HotelCard/service.svg"} alt={""}/>
                                <Text fontWeight={400}>{service.name}</Text>
                            </span>
                        ))}
                        {/*{Array.from({length: 5}).map((_, index) => (*/}
                        {/*    <span>*/}
                        {/*    <img key={index} src={"src/assets/Hotel/HotelCard/service.svg"} alt={""}/>*/}
                        {/*    <Text fontWeight={400}>Free Wifi</Text>*/}
                        {/*</span>*/}
                        {/*))}*/}
                    </div>
                </div>
                <div className={className.hotelCardPrice}>
                    <div className={"hotel-price"}>
                        <Text fontWeight={700}>
                            {t('hotelPage.hotelCard.price')}
                        </Text>
                        <Title level={4} color={appConfig.colors.primary}>
                            <Currency price={hotelDetail?.fromPrice ?? 10000}/>
                        </Title>
                    </div>
                    <Button buttonType={isDetailHotel ? "primary" :"reverse-primary"}>
                        <Text fontWeight={700} fontSize={"16px"}>{t('hotelPage.hotelCard.button')}</Text>
                    </Button>
                </div>
            </Flex>

        </StyledHotelCard>
    );
}
const StyledHotelCard = styled(Flex)`
    flex-grow: 1;
    gap: 12px;
    padding: 12px;

    .hotel-card-rating {
        height: 12px;
        line-height: 12px;
        gap: 6px;

        img {
            width: 12px;
            height: 12px;
        }
    }

    .hotel-card-services {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        flex-wrap: wrap;
        padding: 8px 14px;
        width: fit-content;
        border-radius: 12px;

        & > span {
            display: flex;
            align-items: center;
            gap: 6px;
        }
    }


    .hotel-card-price {
        display: flex;
        justify-content: space-between;

        .hotel-price {
            display: flex;
            flex-direction: column;
        }

        button {
            width: fit-content;
            height: fit-content;
            padding: 8px 50px;

            .ant-typography {
                color: ${appConfig.colors.primary};
            }
        }
    }

    .hotel-card-info-left {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
    }

    .hotel-card-info-left.is-detail-hotel {
        margin-bottom: 0;
    }

    .hotel-card-price.is-detail-hotel {
        margin-left: auto;
        flex-direction: column;
        gap: 12px;

        .hotel-price {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        button {
            .ant-typography {
                color: white;
            }
        }
    ;
    }

    &.screen-xl {  
        @media (min-width: 1200px) {
            .hotel-card-rating {
                height: 16px;
                line-height: 16px;
                gap: 12px;
                img {
                    width: 16px;
                    height: 16px;
                }
            }
            .ant-typography {
                font-size: 16px;
            }
            h3.ant-typography{
                font-size: 32px;
            }
            h4.ant-typography{
                font-size: 24px;
            }
        }
       
        
    }

`;
