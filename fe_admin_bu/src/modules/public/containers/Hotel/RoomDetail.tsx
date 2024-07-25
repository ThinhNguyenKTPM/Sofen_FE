import {Text} from "components/typhograpy/Text.tsx";
import styled from "styled-components";
import {Flex, Image} from "antd";
import {RoomInfoCard} from "public/components/Hotel/Card/RoomInfoCard.tsx";
import Col from "components/layout/Col.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";
import {RoomDetailResponse} from "public/models/Room.ts";

interface RoomDetailProps {
    room: RoomDetailResponse;
}

export const RoomDetail = ({room}: RoomDetailProps) => {
    const {t} = useTranslation();

   const roomMainImage = room.images.find((image) => image.isMain);
   const roomOtherImages = room.images.filter((image) => !image.isMain);
    return (
        <StyledRoomDetail vertical={true}>
            <div className={"room-detail-title"}>
                <Text fontSize={"18px"} fontWeight={800}>{room.roomTypeName}</Text>
            </div>
            <div className={"room-detail-content"}>
                <Col className={"room-detail-content-left"} sm={24} md={8} lg={6}>
                    <Flex className={"room-detail-content-images"} vertical={true}>
                        <div className={"main-image"}>
                            <Image src={roomMainImage?.url}/>
                        </div>
                        {
                            roomOtherImages && roomOtherImages.map((image) => {
                                return (
                                    <Image src={image.url}/>
                                )
                            })
                        }
                    </Flex>
                    <Text fontSize={"16px"} fontWeight={800}>
                        <img src="src/assets/Hotel/Room/area.svg" alt=""/>
                        <span style={{marginLeft: "4px"}}>
                         {room.area} m<sup>2</sup>
                        </span>
                    </Text>
                    <StyledFurnitureItem wrap={"wrap"} gap={6} className={"room-detail-content-furniture"}>
                        {
                            room.furnitures.map((furniture) => (
                                <div className={"furniture-item"}>
                                    <Text fontWeight={500} color={appConfig.colors.primary}>{furniture.name}</Text>
                                </div>
                            ))
                        }
                    </StyledFurnitureItem>
                </Col>
                <Col className={"room-detail-content-right"} sm={24} md={16} lg={18}>
                    <RoomInfoCard room={room}/>
                </Col>

            </div>

        </StyledRoomDetail>
    )
};
const StyledRoomDetail = styled(Flex)`
    margin: 12px 0;

    .room-detail-title {
        margin-bottom: 12px;
        padding: 0 12px;
    }

    .room-detail-content {
        display: flex;
        flex-direction: column;

        .room-detail-content-left {
            margin-right: 6px;

            .room-detail-content-images {
                width: 100%;

                img {
                    width: 100%;
                }

                .main-image {
                    overflow: hidden;
                    border-radius: 12px 12px 0 0;
                    margin-bottom: 6px;
                }
            }

            .room-detail-content-furniture {
                margin-top: 6px;

                .furniture-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 6px;
                    padding: 4px 16px;
                    border-radius: 12px;
                    background-color: #FFD8B8;
                }
            }
        }
        .room-detail-content-right {
            flex-grow: 1;
        }

        @media (min-width: 768px ) {
            flex-direction: row;
        }
    }
`;

const StyledFurnitureItem = styled(Flex)`
    height: 100px;
    overflow-y: scroll;
    overflow-x: hidden ;
`;