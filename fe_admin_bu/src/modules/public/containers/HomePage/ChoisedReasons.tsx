 import styled from "styled-components";
import {Title} from "components/typhograpy/Title.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Text} from "components/typhograpy/Text.tsx";
 import {useTranslation} from "react-i18next";
export const ReasonsOfChoice = () => {
    const {t} = useTranslation();
    return (
            <StyledReasonsOfChoice className={"flex-center-column"}>
                <div className={"choised-title flex-center-row"}>
                    <Title color={"black"}  level={3}>
                        {t('homePage.reasonOfChoice.titleBlack')}
                    </Title>
                    <Title color={appConfig.colors.primary} level={3}>
                        {t('homePage.reasonOfChoice.titleOrange')}
                    </Title>
                </div>
                <Paragraph  style={{marginTop: "10px"}}>
                    {t('homePage.reasonOfChoice.note')}
                </Paragraph>

                <StyledReasonsContent>
                    <div className={"reasons-content-left"}>
                        <div className={"reasons-content-text"}>
                            <div className={"reasons-content-text-index flex-center-row"}>
                                <span>1</span>
                            </div>
                            <Title level={5} >
                                {t('homePage.reasonOfChoice.reason1Title')}
                            </Title>
                            <Paragraph>
                                {t('homePage.reasonOfChoice.reason1Text')}
                            </Paragraph>
                        </div>

                        <div className={"reasons-content-text"}>
                            <div className={"reasons-content-text-index flex-center-row"}>
                                <span>2</span>
                            </div>
                            <Title level={5} >
                                {t('homePage.reasonOfChoice.reason2Title')}
                            </Title>
                            <Paragraph>
                                {t('homePage.reasonOfChoice.reason2Text')}
                            </Paragraph>
                        </div>
                        <div className={"reasons-content-text"}>
                            <div className={"reasons-content-text-index flex-center-row"}>
                                <span>3</span>
                            </div>
                            <Title level={5} >
                                {t('homePage.reasonOfChoice.reason3Title')}
                            </Title>
                            <Paragraph>
                                {t('homePage.reasonOfChoice.reason3Text')}
                            </Paragraph>
                        </div>


                    </div>
                    <div className={"reasons-content-right"}>
                        
                        <img className={"img-1"} src="src/assets/HomePage/ReasonsOfChoice/img.png" alt=""/>
                        <img className={"img-2"} src="src/assets/HomePage/ReasonsOfChoice/img_1.png" alt=""/>


                        <div className="rating  rating-1">
                            <div className={"avatar-img"}>
                                <img src="src/assets/HomePage/ReasonsOfChoice/rating/img.png" alt=""/>
                            </div>
                            <div className={"flex-center-column"}>
                                <Text children={"Dũng Phạm"}/>
                                <Text children={"5 *"} color={appConfig.colors.primary}/>
                            </div>
                        </div>
                        <div className="rating rating-2">
                            <div className={"avatar-img"}>
                                <img src="src/assets/HomePage/ReasonsOfChoice/rating/img_1.png" alt=""/>
                            </div>
                            <div className={"flex-center-column"}>
                                <Text children={"Nguyễn Quang Tuấn  "}/>
                                <Text children={"4.5 *"} color={appConfig.colors.primary}/>
                            </div>
                        </div>
                        <div className="rating rating-3">
                            <div className={"avatar-img"}>
                                <img src="src/assets/HomePage/ReasonsOfChoice/rating/img_2.png" alt=""/>
                            </div>
                            <div className={"flex-center-column"}>
                                <Text children={"Emily Truong"}/>
                                <Text children={"4.7 *"} color={appConfig.colors.primary}/>
                            </div>
                        </div>
                    </div>
                </StyledReasonsContent>
            </StyledReasonsOfChoice>
    )
};
const StyledReasonsOfChoice = styled.div`
    margin: 20px 0;
    .choised-title {
        h3 {
            margin: 0 5px;
        }
    }
`;

const StyledReasonsContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 992px) { 
        flex-direction: row;
    }
    .reasons-content-left {
        .reasons-content-text {
            margin-bottom: 30px;
            .reasons-content-text-index {
                width: 50px;
                height: 50px;
                background-color: ${appConfig.colors.primary};
                border-radius: 50%;
                color: ${appConfig.colors.white};
                font-weight: 700;
                font-size: 18px;
            }
        }
    }

    .reasons-content-right {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        height: 500px;
        .img-1 {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 100%;
            z-index: 0;
        }

        .img-2 {
            position: absolute;
            top: 30%;
            left: 5%;
            z-index: 0;
            width: 70%;
            height: 50%;
        }

        .rating {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            z-index: 20;
            background-color: aliceblue;
            width: 150px;
            border-radius: 10px;
            padding: 5px 5px;
            .avatar-img {
                margin-right: 5px;
                img {
                    width: 40px;
                    height: 40px;
                }
            }
            @media (max-width: 768px) {
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }

        .rating-1 {
            position: absolute;
            top: 15%;
            left: 30%;
        }
        .rating-2 {
            position: absolute;
            bottom: 5%;
            left: 60%;
        }
        .rating-3 {
            position: absolute;
            top: -5%;
            left: 70%;
        }

    }
}



`;