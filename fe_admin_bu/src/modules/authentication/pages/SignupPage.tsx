import {MainPage} from "public/pages/PublicPage.tsx";
import SignUpForm, {SignUpFormReq} from "authentication/containers/SignUpForm.tsx";
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {AuthorizationSiteMap} from "authentication/routers/AuthorizationSiteMap.ts";
import {CreateAccountReq} from "authentication/models/User.ts";
import {useRegisterMutation} from "authentication/services/AuthSerivceApi.ts";

export const SignupPage = () => {

    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    // const {account} = useAppSelector((state) => state.auth);
    //
    // useEffect(() => {
    //     if (account) {
    //         navigate(PublicSiteMap.INDEX);
    //     }
    // }, [account]);

    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            birthDate: "",
            password: "",
            passwordConfirm: "",
        } as SignUpFormReq,
        validationSchema: yup.object().shape({
            fullName: yup.string().required("Vui lòng nhập họ tên"),
            phoneNumber: yup
                .string()
                .trim()
                .length(10, "Số điện thoại phải đủ 10 ký tự")
                .matches(/^0\d{9}$/, "Số điện thoại không đúng định dạng")
                .required("Vui lòng nhập số điện thoại"),
            email: yup
                .string()
                .trim()
                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Email không đúng định dạng")
                .required("Vui lòng nhập email"),
            birthDate: yup
                .string()
                .trim()
                .required("Vui lòng nhập ngày sinh"),
            password: yup
                .string()
                .trim()
                .min(8, "Mật khẩu tối thiểu 8 ký tự")
                .required("Vui lòng nhập mật khẩu"),
            passwordConfirm: yup
                .string()
                .trim()
                .oneOf(
                    [yup.ref("password")],
                    "Xác nhận mật khẩu không chính xác"
                )
                .required("Vui lòng nhập xác nhận mật khẩu"),
        }),
        onSubmit: (values) => {
            handleOnSuccess(values);
        },
    });

    const openLoadingMessage = () => {
        message.loading({
            content: "Loading...",
            key: "loadingKey",
            duration: 0,
        });
    };

    // Function to close the loading message
    const closeLoadingMessage = () => {
        message.destroy("loadingKey");
    };

    const handleOnSuccess = async (formData: SignUpFormReq) => {
        openLoadingMessage();
        const birthdayDate = new Date(formData.birthDate);
        const formatedBirthday =
            birthdayDate.getDate().toString().padStart(2, "0") +
            "/" +
            (birthdayDate.getMonth() + 1).toString().padStart(2, "0") +
            "/" +
            birthdayDate.getFullYear();
        const registerData: CreateAccountReq = {
            birthday: formatedBirthday,
            email: formData.email,
            fullName: formData.fullName,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            phoneCode: "+84",
        };
        register(registerData)
            .unwrap()
            .then(() => {
                message.success("Đăng ký thành công!!");
                navigate(AuthorizationSiteMap.VALIDATE, {
                    state: {email: registerData.email, isActive: true},
                });
            })
            .catch((error: Error) => {
                console.log(error);
                message.error("Đăng ký thất bại");
                switch (error.data.error) {
                    case "email_already_exists":
                        formik.setErrors({email: "Email đã tồn tại"});
                        break;
                    case "duplicate.phone_number":
                        formik.setErrors({
                            phoneNumber: "Số điện thoại đã tồn tại",
                        });
                        break;
                }
            })
            .finally(() => {
                closeLoadingMessage();
            });
    };
    return (
        <MainPage>
            <SignUpForm onSuccess={handleOnSuccess} formik={formik}/>
        </MainPage>
    )
}