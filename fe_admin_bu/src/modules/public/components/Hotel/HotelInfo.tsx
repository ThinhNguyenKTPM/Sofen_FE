import styled from "styled-components";
import Col from "components/layout/Col.tsx";
import {Flex} from "antd";
import {Text} from "components/typhograpy/Text.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useState} from "react";
import {useTranslation} from "react-i18next";

interface HotelInfoProps {
    hotelInfo: string;
}
export const HotelInfo = (props : HotelInfoProps) => {
    const {t} = useTranslation();
    const [isEllipsis, setIsEllipsis] = useState( true);
    const ellipsis = {
            rows: 4,
            expandable: false,
            // suffix: string,
            // symbol: ReactNode,
            // tooltip: boolean | ReactNode | TooltipProps,
            // onExpand: function (event),
            // onEllipsis: function (ellipsis),
        }
    ;
    const destination = [
        {
            id: 1,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
        {
            id: 2,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
        {
            id: 3,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
        {
            id: 4,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
        {
            id: 5,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
        {
            id: 6,
            name: "Bãi biển",
            distance: "1km",
            icon: "src/assets/HomePage/Utilitis/coffee.svg",
        },
    ]
    return (

        <StyledHotelInfo className={"hotel-info"}>
            <Col sm={9} className={"hotel-info-left"}>
                <Text fontSize={"16px"}>{t('hotelPage.hotelCard.hotelInfo')}</Text>
                <Paragraph fontSize={"14px"} ellipsis={isEllipsis ? ellipsis : false}>
                    {props.hotelInfo}
                </Paragraph>
                <Text onClick={() => {
                    setIsEllipsis(!isEllipsis)
                }} className={"see-more-info"} fontSize={"14px"} color={appConfig.colors.primary}>{t('hotelPage.hotelCard.hotelInfoReadMore')}</Text>

            </Col>
            <Col sm={15} className={"hotel-info-right"}>
                <Text fontSize={"16px"}>{t('hotelPage.hotelCard.inArea')}</Text>
                <div className={"destination-in-area"}>
                    {destination.map((item, index) => {
                        return (
                            <Flex key={index} className={"destination-item"} wrap={"wrap"}>
                                <img src={item.icon} alt={item.name}/>
                                <Text fontSize={"14px"}>{item.name}</Text>
                                <Text fontSize={"14px"} color={appConfig.colors.primary}>{item.distance}</Text>
                            </Flex>
                        )
                    })}
                </div>
            </Col>
        </StyledHotelInfo>
    );
}
const StyledHotelInfo = styled(Flex)`
    margin-top: 5px;
    max-height: 170px;
    //height: fit-content;
    flex-wrap: wrap;
    //margin-bottom: 20px;
    .ant-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
        height: 100%;
        border-radius: 12px;
        background-color: white;
    }

    .hotel-info-left {
        flex: 1;
        height: initial;
        margin-right: 12px;
        .see-more-info{
           margin-left: auto; 
        }
    }
    .hotel-info-right {
        flex: 1;
        height: initial;
        .destination-in-area {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 10px;
            .destination-item {
                display: flex;
                gap: 12px;
                align-items: center;
                img {
                    width: 20px;
                    height: 20px;
                }
                .ant-typography:last-child {
                    margin-left: auto;
                    margin-right: 30px; 
                }
            }
        }
        @media (max-width: 576px) {
            .destination-in-area {  
                grid-template-columns: 1fr;
                gap: 3px;
                img{
                    width: 16px;
                    height: 16px;
                }
                .ant-typography:last-child {
                    margin-left: auto;
                }
            }
        }
    }
    
`;