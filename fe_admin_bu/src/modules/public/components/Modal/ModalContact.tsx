import {Modal} from "components/modal/Modal.tsx";
import {Button} from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

export const ModalContact = () => {
    const {t} = useTranslation();
    return (
        <Modal
            title={""}
            width={"80%"}
            trigger={
                <StyledButton  className={"black-button"}>
                    <span>
                        {t('homePage.slogan.contact')}
                    </span>
                </StyledButton>}
        >
            <div>
                <h1>Modal Contact</h1>
            </div>
        </Modal>
    )
}
const StyledButton = styled(Button)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 16px;
        background-color: black;
        color: white;
        border-radius: 0;
        border: none;
        cursor: pointer;
        width: 200px;
        padding-left: 0;
    
`;