import {Modal} from "components/modal/Modal.tsx";
import {useTranslation} from "react-i18next";

export const ModalLogin = () => {
    const {t} = useTranslation();
    return (
        <Modal
            title={"Đăng nhập"}
            width={"50%"}
            trigger={
                <span>
                        {t('header.signIn')}
                </span>
            }
        >
            <div>
                <h1>Modal Login</h1>
            </div>
        </Modal>
    );
}
