import styled from "styled-components";
import {Image} from "antd";
import {appConfig} from "app/config/AppConfig.ts";
import {HotelCardContent} from "./HotelCardContent.tsx";

export const HotelCard = () => {
    return (
            <StyledHotelCard>
                <Image src={"src/assets/HomePage/RoomsImages/CanTho.jpg"} className={"hotel-card-img"}/>
                <HotelCardContent isDetailHotel={false}/>
            </StyledHotelCard>
    )
}
const StyledHotelCard = styled.div`
    display: flex;
    max-width: 1140px;
    height: 250px;
    border-radius: 12px;
    background-color: white;
    overflow: hidden;
    border: 1px solid ${appConfig.table.borderColor};
    transition: border 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
        border: 1px solid ${appConfig.colors.primary};
        box-shadow: 0 0 10px 0 ${appConfig.colors.primary};

        .reverse-primary.ant-btn-default:not(:disabled):not(.ant-btn-disabled) {
            .ant-typography {
                color: white;
            }

            background-color: ${props => props.theme.colors.primary};
        }
    }

    .hotel-card-img {
        width: 250px;
        height: 100%;
    }
`;