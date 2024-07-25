import styled from "styled-components";
import {Text} from "components/typhograpy/Text.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";

export interface RoomImageProps {
    tagClass?: "room-image-tag-left" | "room-image-tag-right";
    centerClass?: boolean;
    src?: string;
    price?: string;
    title?: string;
    place?: string;
}
export const RoomImage = (
    {
        tagClass,
        centerClass,
        src,
        price,
        title,
        place
    }: RoomImageProps
) => {
    const {t} = useTranslation();

    return(
        <StyledRoomImage >
            <div className={"tag " + tagClass}>
                <span>
                      {place}
                </span>
            </div>
            <img src={src} alt="" className={centerClass ? "center-image" : undefined}/>
            <div className={"flex-center-column"}>
                <Text children={"~" + price + ` ${t('homePage.ourRooms.billionPrice')} VND`} color={appConfig.colors.primary} />
                <Title children={title} level={5}/>
            </div>


        </StyledRoomImage>
    )
};
const StyledRoomImage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    font-family: KoHo;
    margin-bottom: 20px;
    cursor: pointer;
    .tag {
        background-color: ${appConfig.colors.primary};
        color: white;
        font-weight: bold;
        padding: 5px 10px;
        span{
            font-size: 14px;
            line-height: 14px;
        }
        z-index: 1;
    }

    .room-image-tag-left {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 10px 0 10px 0;
    }

    .room-image-tag-right {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0 10px 0 10px;
    }
    img{
        width: 22vw;
        height: 18vw;
        border-radius: 10px;
    }
    .center-image{
        width: 30vw;
        height: 35vw;
    }
    .ant-typography{
        margin: 0;
        font-weight: bold;
        font-family: KoHo;
        
    }
    

`;
