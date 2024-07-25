import styled from "styled-components";
import {Text} from "components/typhograpy/Text.tsx";
import {RoomDetailResponse} from "public/models/Room.ts";
import {Flex, Tooltip} from "antd";
import {appConfig} from "app/config/AppConfig.ts";
import {Currency} from "components/currency/Currency.tsx";
import {Button} from "components/button/Button.tsx";
import React from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";

export interface RoomCardProps extends React.HTMLAttributes<HTMLDivElement> {
    room: RoomDetailResponse;
}

export const RoomInfoCard = ({room}: RoomCardProps) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const discount = 10;
    const price = room?.price;
    const services = [
        {
            image: "src/assets/Hotel/Room/Services/wifi-active.svg",
            active: false,
            title: "Không gồm bửa ăn sáng"
        },
        {
            image: "src/assets/Hotel/Room/Services/wifi-active.svg",
            active: true,
            title: "Wifi miễn phí"
        },
        {
            image: "src/assets/Hotel/Room/Services/wifi-active.svg",
            active: true,
            title: "Không hút thuốc"
        },
        {
            image: "src/assets/Hotel/Room/Services/wifi-active.svg",
            active: false,
            title: "Không hoàn tiền"
        },
        {
            image: "src/assets/Hotel/Room/Services/wifi-active.svg",
            active: false,
            title: "Không đổi lịch"
        },

    ]
    const handleBookingClick = () => {
        localStorage.setItem("room", JSON.stringify(room));
        console.log("Booking room");
        navigate(PublicSiteMap.BOOKING_STEP1);
    }
    return (
        <StyledRoomCard>
            <Flex className="room-info-card-top" justify={"flex-start"} gap={24}>
                <Flex gap={4}>
                    <img src="src/assets/Hotel/Room/bed.svg" alt=""/>
                    <Text fontSize={"14px"} fontWeight={500}>
                        {`${1} giường đôi`}
                    </Text>
                </Flex>
                <Flex gap={4}>
                    <img src="src/assets/Hotel/Room/customer.svg" alt=""/>
                    <Text fontSize={"14px"} fontWeight={500}>
                        {room.maxAdult} {t('hotelPage.roomCard.guest')}
                    </Text>
                </Flex>
                {
                    room.remain <= 10 ? <Text fontSize={"14px"} fontWeight={700} color={appConfig.colors.primary}
                                              style={{marginLeft: "auto"}}
                    >
                        {room.remain} {t('hotelPage.roomCard.availableRoom')}
                    </Text> : null
                }

            </Flex>
            <Flex className="room-info-card-bottom" justify={"flex-start"} gap={12} wrap={"wrap"}>
                <div className={"room-info-card-services"}>
                    {
                        services.map((item, index) => {
                            return (
                                <Flex gap={8} key={index} className={"room-info-card-service-item"}>
                                    <img src={item.image} alt=""/>
                                    <Text fontSize={"14px"} fontWeight={700} color={item.active ? "green" : "gray"}>
                                        {item.title}
                                    </Text>
                                </Flex>
                            )
                        })
                    }
                    <Tooltip className={"room-info-card-service-item cancellation-policy"}
                             title="Không hoàn tiền"
                    >
                        <img src="src/assets/Hotel/Room/Services/tooltip-icon.svg" alt=""/>
                        <Text color={"#149aee"} fontSize={"14px"}>{t('hotelPage.roomCard.cancelPolicy')}</Text>
                    </Tooltip>
                </div>
                <Flex className={"room-info-card-price"} gap={8} align={"flex-end"}>
                    {
                        discount ? (
                            <>
                                <Text
                                    fontSize={"14px"} color={appConfig.colors.fadedTxt} delete={true}
                                >
                                    <Currency
                                        price={price}
                                    />
                                </Text>
                            </>
                        ) : (<></>)
                    }
                    <Text
                        fontSize={"1.5rem"} color={appConfig.colors.primary}>
                        <Currency price={price - (price * discount) / 100}/>
                    </Text>
                    <Text fontSize={"14px"} color={appConfig.colors.fadedTxt}>
                        {t('hotelPage.roomCard.price')}
                    </Text>
                </Flex>

            </Flex>
            <div className={"room-info-card-button"}>
                <Button buttonType={"primary"} handleClickButton={handleBookingClick}>
                    {t('hotelPage.hotelCard.button')}
                </Button>
            </div>

        </StyledRoomCard>
    );
}
const StyledRoomCard = styled.div`
    padding: 12px;
    border-radius: 12px;
    background-color: white;
    margin-bottom: 6px;

    .room-card-title {
        margin-bottom: 40px;
    }

    .room-info-card-top {
        margin-top: 12px;
    }

    .room-info-card-bottom {
        justify-content: space-between;
        margin: 12px 0;
        padding: 12px 0;
        border-top: 2px solid ${appConfig.appBgr};
        border-bottom: 2px solid ${appConfig.appBgr};

        .room-info-card-services {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);

            .room-info-card-service-item {
                margin-right: 24px;

                img {
                    width: 20px;
                    height: 20px;
                }
            }

            .cancellation-policy {
                display: flex;
                align-items: center;
                gap: 4px;

            }
        }

        .room-info-card-price {
            margin-right: 0;
            margin-left: auto;
            @media (min-width: 992px) {
                flex-direction: column;
            }

        }
    }

    .room-info-card-button {
        display: flex;
        justify-content: flex-end;

        button {
            padding: 4px 10px;
            border-radius: 24px;
            font-size: 16px;
            font-weight: 500;
        }
    }

`;