import styled from "styled-components";
import {Title} from "components/typhograpy/Title.tsx";
import {Container} from "public/containers/Container.tsx";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Flex, Space} from "antd";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";

export const Utilities = () => {
    const {t} = useTranslation();
    return (
        <Container backgroundColor={"white"}>
            <StyledUtilities>
                <div className="utilities-left">
                    <Title level={4}>
                        {t('homePage.utilities.title')}
                    </Title>
                    <Paragraph>
                        {t('homePage.utilities.totalRating')}
                    </Paragraph>
                    <div className="stars flex-center-row">
                        <img src="src/assets/star.svg" alt=""/>
                        <img src="src/assets/star.svg" alt=""/>
                        <img src="src/assets/star.svg" alt=""/>
                        <img src="src/assets/star.svg" alt=""/>
                        <img src="src/assets/star.svg" alt=""/>
                    </div>
                    <div className={"avatars flex-center-row"}>
                        <img src="src/assets/avatar.svg" alt=""/>
                        <img src="src/assets/avatar.svg" alt=""/>
                        <img src="src/assets/avatar.svg" alt=""/>
                        <img src="src/assets/avatar.svg" alt=""/>
                        <img src="src/assets/avatar.svg" alt=""/>
                    </div>

                    <Paragraph>
                        {t('homePage.utilities.note')}

                    </Paragraph>
                </div>
                <div className="utilities-right">
                    <Space size={"middle"}>
                        <div className={"utilities-detail"}>
                            <div className={"utilities-detail-content"}>
                                <Title level={5} color={appConfig.colors.primary}>
                                    {t('homePage.utilities.utility1Title')}
                                </Title>
                                <Paragraph>
                                    {t('homePage.utilities.utility1Text')}
                                </Paragraph>
                            </div>
                            <img className={"utilities-detail-img"} src="src/assets/HomePage/Utilitis/restaurant.jpeg"
                                 alt=""/>
                        </div>

                        <div className={"utilities-detail"}>
                            <div className={"utilities-detail-content"}>
                                <Title level={5} color={appConfig.colors.primary}>
                                    {t('homePage.utilities.utility2Title')}

                                </Title>
                                <Paragraph>
                                    {t('homePage.utilities.utility2Text')}
                                </Paragraph>
                            </div>
                            <img className={"utilities-detail-img"} src="src/assets/HomePage/Utilitis/restaurant.jpeg"
                                 alt=""/>
                        </div>
                    </Space>
                    <Space size={"middle"}>
                        <div className={"utilities-detail"}>
                            <div className={"utilities-detail-content"}>
                                <Title level={5} color={appConfig.colors.primary}>
                                    {t('homePage.utilities.utility3Title')}

                                </Title>
                                <Paragraph>
                                    {t('homePage.utilities.utility3Text')}
                                </Paragraph>
                            </div>
                            <img className={"utilities-detail-img"} src="src/assets/HomePage/Utilitis/restaurant.jpeg"
                                 alt=""/>
                        </div>
                        <div className={"utilities-detail"}>
                            <div className={"utilities-detail-content"}>
                                <Title level={5} color={appConfig.colors.primary}>
                                    {t('homePage.utilities.utility4Title')}

                                </Title>
                                <Paragraph>
                                    {t('homePage.utilities.utility4Text')}
                                </Paragraph>
                            </div>
                            <img className={"utilities-detail-img"} src="src/assets/HomePage/Utilitis/restaurant.jpeg"
                                 alt=""/>
                        </div>
                    </Space>
                </div>
            </StyledUtilities>
        </Container>

    )
}
const StyledUtilities = styled(Flex)`
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: inherit;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    .utilities-left {
        margin: 40px 0 auto;

        .flex-center-row {
            justify-content: flex-start;
        }

        .stars {
            margin-bottom: 40px;
        }

        .avatars {
            margin-bottom: 40px;

            img {
                position: absolute;
            }

            img:nth-child(1) {
                left: 0;
            }

            img:nth-child(2) {
                left: 30px;
            }

            img:nth-child(3) {
                left: 70px;
            }

            img:nth-child(4) {
                left: 110px;
            }

            img:nth-child(5) {
                left: 150px;
            }
        }
    }


    .utilities-right {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 10px;
        margin-top: 20px;
        .utilities-detail {
            display: flex;
            width: 250px;
            height: 130px;
            padding: 20px;
            
            @media (min-width: 768px) {
                width: 250px;
                //height: 150px;
            }
            @media (min-width: 992px) {
                width: 350px;
            }
            background-color: white;
            box-shadow: 0px 0px 10px 0px #00000029;
            cursor: pointer;

            .utilities-detail-content {
                margin: auto 0;
            }

            .utilities-detail-img {
                height: 5vw;
                width: 5vw;
                border-radius: 50%;
                margin-left: auto;
                margin-right: 0;
            }
        }


    }

`;
