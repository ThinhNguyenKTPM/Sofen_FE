import { FormikProvider, useFormik } from "formik";
import Input from "@/components/form/Input";
import { Button } from "@/components/button/Button";
import styled from "styled-components";
import { appConfig } from "@/app/config/AppConfig";
import * as yup from "yup";
import {useTranslation} from "react-i18next";


export interface EmailFormReq {
    emailInput: string;
}

export interface SearchFormProps {
    onSuccess: (data: EmailFormReq) => void;
}

export const EmailFormFooter = ({ onSuccess }: SearchFormProps) => {
    const {t} = useTranslation();
    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            emailInput: "",
        } as EmailFormReq,
        validationSchema: yup.object().shape({
            email: yup.string()
                .email(`${t('footer.inputForm.emailInvalid')}`)
                .required(`${t('footer.inputForm.emailRequired')}`),
        }),

        onSubmit: (values) => {
            onSuccess(values);
        },
    });

    const handleClickButton = () => {
        formik.submitForm();
    };

    return (
        <StyledEmailForm>
            <FormikProvider value={formik}>

                    <Input
                        label=""
                        name="emailInput"
                        type="text"
                        placeholder={t('footer.contact.inputPlaceholder')}
                        style={{
                            fontSize: "unset",
                            height: "unset",
                        }}
                        onKeyDown={(
                            event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                            if (event.key === "Enter") {
                                formik.submitForm();
                            }
                        }}
                    />
                    <StyledButton
                        handleClickButton={handleClickButton}
                        className={"primary-button"}
                    >
                        {t('footer.contact.button')}
                    </StyledButton>
            </FormikProvider>
        </StyledEmailForm>
    );
};
const StyledEmailForm = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    &>div{
        border-radius: 12px 0 0 12px;
    
    }
`;
const StyledButton = styled(Button)`
    border-radius: 0 12px 12px 0;
    background-color: ${appConfig.colors.primary};
`;
