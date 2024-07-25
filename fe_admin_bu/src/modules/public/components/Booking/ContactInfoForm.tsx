import {Text} from "components/typhograpy/Text.tsx";
import BaseInput from "components/form/BaseInput.tsx"
import styled from "styled-components";
import {Flex, Radio, RadioChangeEvent} from "antd";
import {useEffect, useState} from "react";
import {Paragraph} from "components/typhograpy/Paragraph.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useTranslation} from "react-i18next";

export const ContactInfoForm = () => {
    const {t} = useTranslation();
    const [isGuest, setIsGuest] = useState(1);
    const [radioValue, setRadioValue] = useState(1);
    const guestOptions = [
        {label: `${t('bookingForm.guestOptions.label1')}`, value: 1},
        {label: `${t('bookingForm.guestOptions.label2')}`, value: 2}
    ];
    useEffect(() => {

    }, [isGuest]);
    const radioOnChange = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value)
        if (e.target.value === 2) {
            setIsGuest(2)
        } else {
            setIsGuest(1)
        }
    }
    return (
        <StyledContactInfoForm justify={"center"} vertical={true}>
            <StyledFormTitle>
                <Text fontSize="20px" fontWeight={700}>
                    {t('bookingForm.title')}
                </Text>
                <Paragraph fontSize="16px" color={appConfig.colors.txt}>
                    {t('bookingForm.note')}
                </Paragraph>
            </StyledFormTitle>
            <StyledInputGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.name')}
                </Text>
                <BaseInput type="text" required={true} name={"fullName"} size={"large"}/>
                <Paragraph fontSize="14px" color={appConfig.colors.txt}>
                    {t('bookingForm.nameDesc')}`
                </Paragraph>
            </StyledInputGroup>

            <StyledInputGroup>
                <Text fontSize="16px" fontWeight={700}>
                    {t('bookingForm.email')}
                </Text>
                <BaseInput type="email" required={true} name={"email"}/>
                <Paragraph fontSize="14px" color={appConfig.colors.txt}>
                    {t('bookingForm.emailDesc')}
                </Paragraph>
            </StyledInputGroup>
            <StyledInputGroup>
                <Text fontSize="16px" fontWeight={700}>
                   {t('bookingForm.phone')}
                </Text>
                <BaseInput type="phoneNumber" required={true} name={"phoneNumber"}/>
                <Paragraph fontSize="14px" color={appConfig.colors.txt}>
                    {t('bookingForm.phoneDesc')}
                </Paragraph>
            </StyledInputGroup>
            <StyledInputGroup>
                <Radio.Group onChange={radioOnChange} options={guestOptions} value={radioValue}>
                </Radio.Group>
                <StyledInputGroup className={isGuest !== 2 ? "hidden-guest-input" : "display-guest-input"}>
                    <Text fontSize="16px" fontWeight={700}>
                        {t('bookingForm.guestName')}
                    </Text>
                    <BaseInput type="text" required={true} name={"guestName"}/>
                </StyledInputGroup>
            </StyledInputGroup>
            <Flex gap={12} wrap={"wrap"}>
                <StyledInputGroup>
                    <Text fontSize="16px" fontWeight={700}>
                        {t('bookingForm.discountCode')}
                    </Text>
                    <BaseInput type="text" name={"discountCode"}/>
                </StyledInputGroup>
                <StyledInputGroup>
                    <Text fontSize="16px" fontWeight={700}>
                        {t('bookingForm.specialRequest')}
                    </Text>
                    <BaseInput type="text" name={"specialRequest"}/>
                    <Paragraph fontSize="14px" color={appConfig.colors.txt}>
                        {t('bookingForm.specialRequestDesc')}
                    </Paragraph>
                </StyledInputGroup>
            </Flex>
            <StyledInputGroup>
                <Text fontSize={"18px"} fontWeight={600}>
                    {t('bookingForm.pickUpDestination')}
                </Text>
                <Paragraph fontSize="16px" color={appConfig.colors.txt}>
                    {t('bookingForm.pickUpDestinationDesc')}
                </Paragraph>
                <BaseInput type={"textarea"} name={"pickupLocation"} maxLength={200} textAreaRows={2}/>
            </StyledInputGroup>
        </StyledContactInfoForm>
    );
};

const StyledContactInfoForm = styled(Flex)`
    margin-bottom: 6px;
    padding: 6px 12px;
    border-radius: 12px;
    background-color: ${appConfig.colors.background};

`;
const StyledFormTitle = styled.div`
    margin-bottom: 6px;
`;
const StyledInputGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 4px;
    margin: 6px 0;

    &.hidden-guest-input {
        display: none;
    }

    &.display-guest-input {
        display: flex;
    }
`;