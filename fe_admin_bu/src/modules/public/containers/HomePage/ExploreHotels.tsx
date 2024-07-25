import styled from "styled-components";
import {Title} from "components/typhograpy/Title.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import Col from "components/layout/Col.tsx";
import {Button} from "components/button/Button.tsx";
import {useTranslation} from "react-i18next";

export const ExploreHotels = () => {
    const {t} = useTranslation();
    const contentDesktopCols = 20;
    const contentMobileCols = 22;
    return (
        <div
            style={{
                backgroundColor: "#F3F3F3",
                height: "auto",
                marginLeft: "0",
                marginRight: "0",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Col
                xs={1}
                sm={(24 - contentMobileCols) / 2}
                md={(24 - contentMobileCols) / 2}
                lg={(24 - contentDesktopCols) / 2}
                xl={(24 - contentDesktopCols) / 2}
            ></Col>
            <StyledExploreHotels
                xs={23}
                sm={12 + 0.5 * contentMobileCols}
                md={12 + 0.5 * contentMobileCols}
                lg={12 + 0.5 * contentDesktopCols}
                xl={12 + 0.5 * contentDesktopCols}>
                <Col className={"explore-left"} md={12}>
                    <Title className={"explore-title"} level={3}>
                        {t("homePage.discovery.titleHeader")}
                    </Title>
                    <Paragraph className={"explore-left-content"} fontSize={"16px"}>
                        {t("homePage.discovery.titleBlack")}
                    </Paragraph>
                    <Title level={3}>
                        {t("homePage.discovery.titleOrange")}
                    </Title>
                    <br/>
                    <Title level={3} color={appConfig.colors.primary}>
                        {t("homePage.discovery.note")}
                    </Title>
                    <Button type="primary">
                        {t("homePage.discovery.explore")}
                    </Button>
                </Col>

                <Col className={"explore-right"} md={12}>
                    <Col style={{padding: "0"}}>
                        <img src="src/assets/HomePage/Explore/HaNoi.png" alt=""/>
                    </Col>
                    <Col style={{padding: "0"}}>
                        <img src="src/assets/HomePage/Explore/SaiGon.png" alt=""/>
                    </Col>
                    <Col style={{padding: "0"}}>
                        <img src="src/assets/HomePage/Explore/CanTho.png" alt=""/>
                    </Col>
                </Col>
            </StyledExploreHotels>
        </div>

    );
}
const StyledExploreHotels = styled(Col)`
    flex-grow: 1;
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    background-color: #F3F3F3;
    
    .explore-left {
        margin: auto 0;
        .ant-typography {
            margin: 10px 2px;
        }
        .ant-typography:last-child {
            margin-top: 10px;
        }
        .explore-left-content {
            margin: 20px 0;
        }
        .explore-title::after {
            margin-top: 15px;
            margin-bottom: 20px;
            content: "";
            display: block;
            width: 100%;
            height: 3px;
            background-color: ${appConfig.colors.primary};
        }
        button {
            margin-top: 30px;
            padding: 10px 50px;
            width: fit -content;
            border-radius: 27px;
            font-weight: bold;
        }
        
        @media (min-width: ${appConfig.breakpoints.md}) {
            .explore-title {
                margin-bottom: 5px;
            }
            .explore-left-content {
                margin: 5px 0;
            }
            button {
                margin-top: 10px;
            }
        }
        @media (min-width: ${appConfig.breakpoints.sm}) {
            .explore-title {
                margin-bottom: 10px;
            }
            .explore-left-content {
                margin: 10px 0;
            }

            button {
                margin-top: 20px;
            }

            .explore-left-content {
                margin: 5px 0;
            }
        }
        @media (max-width: ${appConfig.breakpoints.sm}) {
            .explore-title {
                margin-bottom: 5px;
            }
            .explore-left-content {
                margin: 5px 0;
            }
            button{
                margin-top: 5px;
                padding: 5px 25px;
            }
        }
    }

    .explore-right {
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;

        img {
            width: 100%;
            height: 100%;
        }

    }

`;
