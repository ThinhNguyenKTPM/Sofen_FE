import {Title} from "components/typhograpy/Title.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import styled from "styled-components";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {RoomImage} from "public/components/HomePage/RoomImages/RoomImage.tsx";
import {useTranslation} from "react-i18next";

export const Rooms = () => {
    const {t} = useTranslation();
    return (
        <StyledRooms className={"flex-center-column"}>
            <Title color={"black"}  level={5}>
                {t('homePage.ourRooms.titleHeader')}
            </Title>
            <div className={"choised-title flex-center-row"}>
                <Title color={"black"}  level={3}>
                    {t('homePage.ourRooms.titleBlack')}
                </Title>
                <Title color={appConfig.colors.primary} level={3}>
                    {t('homePage.ourRooms.titleOrange')}
                </Title>
            </div>
            <Paragraph style={{marginTop: "10px"}}>
                {t('homePage.ourRooms.note')}
            </Paragraph>
            <StyledRoomImages>
                <div className={"room-images-side"}>
                    <RoomImage place={"Đà Nẵng"} price={"3.5"} tagClass={"room-image-tag-left"}
                               centerClass={false} src={"src/assets/HomePage/RoomsImages/DaNang.png"}
                               title={"Ba Na Hills"}
                    />
                    <RoomImage place={"Nha Trang"} price={"1.5"} tagClass={"room-image-tag-left"}
                               centerClass={false} src={"src/assets/HomePage/RoomsImages/NhaTrang.png"}
                               title={"Nha Trang"}
                    />
                </div>
                <div className={"room-image-center"}>
                    <RoomImage place={"Quảng Ninh"} price={"7.5"} tagClass={"room-image-tag-left"}
                               centerClass={true} src={"src/assets/HomePage/RoomsImages/HaLong.png"}
                               title={"Ha Long Bay"}
                    />
                </div>
                <div className={"room-images-side"}>
                    <RoomImage place={"Khánh Hòa"} price={"5.0"} tagClass={"room-image-tag-right"}
                               centerClass={false} src={"src/assets/HomePage/RoomsImages/NinhVanBay.png"}
                               title={"Ninh Vân Bay"}
                    />
                    <RoomImage place={"Cần Thơ"} price={"1.5"} tagClass={"room-image-tag-right"}
                               centerClass={false} src={"src/assets/HomePage/RoomsImages/CanTho.jpg"}
                               title={"Can Tho"}
                    />
                </div>


            </StyledRoomImages>
        </StyledRooms>
    )
}
const StyledRooms = styled.div`
    margin: 20px 0;

    .choised-title {
        h3 {
            margin: 0 5px;
        }
    }
`;
const StyledRoomImages = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    width: 100%;
    .room-image-center{
        display: flex;
        align-items: center;
    }
    
`;