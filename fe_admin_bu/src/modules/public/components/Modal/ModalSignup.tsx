import {Modal} from "components/modal/Modal.tsx";
import {useTranslation} from "react-i18next";

export const ModalSignup = () => {
    const {t} = useTranslation();
    return (
        <Modal
            title={"Đăng nhập"}
            width={"80%"}
            trigger={
                <span>
                        {t('header.signUp')}
                </span>
            }
        >
            <div>
                <h1>Modal SignUp</h1>
            </div>
        </Modal>
    );
}
