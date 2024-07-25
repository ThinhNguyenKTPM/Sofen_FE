import styled from "styled-components";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {Link} from "react-router-dom";
import {FacebookOutlined, InstagramOutlined, TwitterOutlined} from "@ant-design/icons";
import {Container} from "public/containers/Container.tsx";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";
import {ModalContact} from "public/components/Modal/ModalContact.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {EmailFormFooter, EmailFormReq} from "public/components/HomePage/EmailInputGroup.tsx";
import {useTranslation} from "react-i18next";

export const Footer = () => {
    const {t} = useTranslation();
    const contactFormSuccess = (data: EmailFormReq) => {
        console.log(data);
    }
    return (
        <Container backgroundColor={"black"}>
            <FooterStyled>
                <div className={"footer-main"}>
                    <div className="quick-links flex-center-column">
                        <Title level={4} color={"white"}>
                            {t('footer.quickLinks.title')}
                        </Title>
                        <StyledLink to={PublicSiteMap.INDEX}>
                            {t('footer.quickLinks.home')}
                        </StyledLink>
                        <StyledLink to={""}>
                            {t('footer.quickLinks.explore')}
                        </StyledLink>
                        <StyledLink to={""}>
                            {t('footer.quickLinks.about')}
                        </StyledLink>
                        <ModalContact/>
                    </div>
                    <div className="contact flex-center-column">
                        <Title level={2} color={"white"}>
                            {t('footer.contact.title')}
                        </Title>
                        <Paragraph color={"white"}>
                            {t('footer.contact.text')}
                        </Paragraph>
                        <EmailFormFooter onSuccess={contactFormSuccess}/>
                    </div>
                    <div className="policy">
                        <Title level={4} color={"white"}>
                            {t('footer.policy.title')}
                        </Title>
                        <ul>
                            <StyledLink to={""}>
                                {t('footer.policy.policy')}
                            </StyledLink>
                            <StyledLink to={""}>
                                {t('footer.policy.legal')}
                            </StyledLink>
                            <StyledLink to={""}>
                                {t('footer.policy.faq')}
                            </StyledLink>
                        </ul>
                    </div>
                </div>
                <div className={"footer-contact"}>
                    <Paragraph children={<>&copy; 2024 The Sofen Hotel. All rights reserved.</>} color={"white"}/>
                    <ul>
                        <li><StyledLink to={""}><TwitterOutlined/></StyledLink></li>
                        <li><StyledLink to={""}><InstagramOutlined/></StyledLink></li>
                        <li><StyledLink to={""}><FacebookOutlined/></StyledLink></li>
                    </ul>
                </div>
            </FooterStyled>
        </Container>

    )
};
const StyledLink = styled(Link)`
    transition: color 0.5s ease-in-out;

    &:hover {
        color: ${props => props.theme.colors.primary}
    }
`;
const FooterStyled = styled.div`
    background-color: black;

    a {
        color: white;
    }

    .footer-main {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        border-bottom: 2px solid white;

        .quick-links {
            align-items: flex-start;
        }

        .quick-links, .policy {
            width: 250px;
            margin: 40px 0 20px 0;

            a {
                margin: 10px 0;
            }
        }

        .policy {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            ul {
                display: flex;
                flex-direction: column;
                align-items: flex-end;

            }
        }

        .contact {
            align-items: center;
            gap: 20px;
        }
    }

    .footer-contact {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        .ant-typography {
            align-items: center;
            width: 400px;
            padding: 0 auto;
            margin-left: calc(50% - 200px);
            margin-top: 0;
        }

        ul {
            display: flex;
            gap: 20px;
            align-items: center;
            list-style: none;
            padding: 0;
            margin-left: auto;

            svg {
                font-size: 30px;
            }
        }
    }
`;