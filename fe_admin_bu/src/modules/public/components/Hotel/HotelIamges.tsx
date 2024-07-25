import Col from "components/layout/Col.tsx";
import styled from "styled-components";
import {Flex, Image, Row} from "antd";
import {useTranslation} from "react-i18next";
import {HotelImage} from "public/models/Hotel.ts";

interface HotelImagesProps {
    mainImage: HotelImage;
    otherImages: HotelImage[];
}

export const HotelImages = ({mainImage, otherImages}: HotelImagesProps) => {
    const {t} = useTranslation();
    return (
        <StyledHotelImages seeMore={`${t('hotelCard.seeMore')}`}>
            <Col className={"hotel-image-main"} xs={14} style={{marginBottom: "4px", height: "350px"}} padding={"0 2px"}>
                <Image src={mainImage?.url} width={"100%"} alt=""/>
            </Col>
            <Col className={"hotel-image-others"} xs={10} padding={"0 2px"}>
                <StyledOtherImage>
                    <Col xs={12} padding={"0 2px"}>
                        <Flex gap={2} vertical={true}>
                            {otherImages?.slice(0, 3).map((image, index) => (
                                <Image height={"33%"} width={"100%"} key={index} src={image.url} alt=""/>
                            ))}
                        </Flex>


                    </Col>
                    <Col xs={12} padding={"0 2px"}>
                        <Flex gap={2} vertical={true}>
                        {otherImages?.slice(3, 6).map((image, index) => (
                            <Image  height={"100%"} width={"100%"} key={index} src={image.url} alt=""/>
                        ))}
                        </Flex>
                    </Col>
                </StyledOtherImage>
            </Col>
        </StyledHotelImages>
    );
}
const StyledHotelImages = styled.div<{ seeMore: string }>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: inherit;
    img {
        cursor: pointer;
        object-fit: cover;
        border-radius: 12px;
        width: 100%;
    }

    .hotel-image-main {
        margin-bottom: 4px;
        img {
            height: 100%;
        }
    }
`;
const StyledOtherImage = styled(Row)`
    height: 350px;
    
`;