import { Form, FormProps } from "antd";
import { Text } from "@/components/typhograpy/Text";
import styled from "styled-components";

export interface AdminFormProps extends FormProps {
    title: string;
    children: React.ReactNode;
}

const FormHorizontal = ({ title, children }: AdminFormProps) => {
    return (
        <StyledForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <div className="custom-form-name">
                <div>
                    <Text fontSize="32px" fontWeight={600}>
                        {title}
                    </Text>{" "}
                </div>
            </div>

            {children}
        </StyledForm>
    );
};

export default FormHorizontal;

const StyledForm = styled(Form)`
    width: 100%;
    /* min-width: 800px; */
    background: #fff;
    /* margin: 24px; */
    padding: 28px;
    padding-top: 0;
    border-radius: 16px;
    padding-right: 30px;

    .custom-form-name {
        margin-bottom: 24px;
        border-bottom: 1px solid #efefef;
        padding: 1px 0;

        > div {
            padding: 18px 0;
            margin-top: 24px;
        }
    }

    .ant-form-item .ant-form-item-label > label {
        color: #333;
        font-feature-settings: "clig" off, "liga" off;
        font-family: KoHo;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
    }

    [class^="ant-select"],
    [class*=" ant-select"],
    .ant-picker .ant-picker-input > input,
    .ant-input {
        color: #333;
        font-feature-settings: "clig" off, "liga" off;
        font-family: KoHo;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .custom-selected {
        color: #333;
        font-feature-settings: "clig" off, "liga" off;
        font-family: KoHo;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        padding: 0;
    }

    .custom-button {
        display: flex;
        justify-content: end;
        .ant-btn > span {
            color: #333;
            font-feature-settings: "clig" off, "liga" off;
            font-family: KoHo;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 18px;
            padding: 0;
        }
    }
`;
