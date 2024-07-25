import {User} from "authentication/models/User.ts";
import styled from "styled-components";
import {DatePicker, Flex, message, Select} from "antd";
import {Title} from "components/typhograpy/Title.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import BaseInput from "components/form/BaseInput.tsx";
import {FormikProvider, useFormik} from "formik";
import {Button} from "components/button/Button.tsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "app/store/store.ts";
import PhoneNationCode from "components/select/NationCode.tsx";
import {appConfig} from "app/config/AppConfig.ts";
import {useUpdateAccountMutation} from "authentication/services/AccountService.ts";
import {toDateString} from "public/utils/DateUtils.ts";
import * as Yup from "yup";
import {setCredentials} from "app/store/slice/authSlice.tsx";

const openLoadingMessage = () => {
    message.loading({
        content: "Đang cập nhật...",
        key: "loadingKey",
        duration: 0,
    });
};
const closeLoadingMessage = () => {
    message.destroy("loadingKey");
};
export const UserInfo = () => {
    const dispath = useDispatch();
    const user: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const [updateAccount] = useUpdateAccountMutation();
    useEffect(() => {
        if (user) {
            formik.setValues(user)
            console.log(formik.values)
        }
    }, [user]);
    const optionsGender = [
        {value: 'male', label: 'Nam'},
        {value: 'female', label: 'Nữ'},
        {value: 'other', label: 'Không muốn tiết lộ'}
    ]
    const getGenderLabel = (isWomen: boolean | undefined) => {
        if (isWomen === true) {
            return 'female';
        } else if (isWomen === false) {
            return 'male';
        } else {
            return 'other';
        }
    };
    const [gender, setGender] = useState(getGenderLabel(user?.isWomen));

    const formik = useFormik({
        validateOnBlur: true,
        initialValues: {
            email: user?.email ?? "",
            password: user?.password ?? "",
            fullName: user?.fullName ?? "",
            phoneNumber: user?.phoneNumber ?? "",
            phoneCode: user?.phoneCode ?? "",
            avatar: user?.avatar ?? "",
            address: user?.address ?? "",
            isWomen: user?.isWomen ?? undefined,
            point: user?.point ?? "",
            dateOfBirth: user?.dateOfBirth ?? "",
        } as User,
        validationSchema: Yup.object().shape({
            fullName: Yup.string().trim().max(50, "toi da 50").required("Full name is required"),
            phoneNumber: Yup.string().required("Phone number is required"),
            phoneCode: Yup.string().trim().required("Phone code is required"),
            address: Yup.string().trim(),
            dateOfBirth: Yup.string().required("Date of birth is required"),

        }),
        onSubmit: (values) => {
            console.log(values);

        }
    });
    const [disableEdit, setDisableEdit] = useState(true);
    useEffect(() => {
        if (checkEdit()) {
            setDisableEdit(false)
        }
    }, [formik.values]);

    const checkEdit = (): boolean => {
        return formik.values.fullName != user?.fullName
            || formik.values.phoneNumber != user?.phoneNumber
            || formik.values.phoneCode != user?.phoneCode
            || formik.values.address != user?.address
            || formik.values.dateOfBirth != user?.dateOfBirth
            || formik.values.isWomen != user?.isWomen
    }
    const handleReset = () => {
        formik.resetForm();
    }
    const handleUpdate = () => {
        dispath(setCredentials(formik.values));
        updateAccount(formik.values)
            .unwrap()
            .then((res) => {
                message.success("Cập nhật thành công");
                console.log("Update ", res);
            })
            .catch((err) => {
                console.log(err);
                message.error("Cập nhật thất bại");
            });

    }


    const handleGenderChange = (value: string) => {

        setGender(value)
        if (value === 'female') {
            formik.setFieldValue("isWomen", true);
        } else if (value === 'male') {
            formik.setFieldValue("isWomen", false);
        } else {
            formik.setFieldValue("isWomen", undefined);
        }
        console.log("Gender ", value, formik.values);

    }
    const hanldeDateChange = (value: string) => {
        // console.log(toDateString(new Date(value)));
        formik.setFieldValue("dateOfBirth", toDateString(new Date(value)));
        console.log(formik.values);
    }

    return (
        <UserInfoStyled>
            <Flex vertical={true}>
                <StyledInfoHeader>
                    <Flex vertical={true} gap={10} justify={"flex-start"}>
                        <Title level={4}>
                            User Information
                        </Title>
                        <Text fontSize={"16px"} fontWeight={500}>
                            Update your personal information
                        </Text>
                    </Flex>
                </StyledInfoHeader>

                <FormikProvider value={formik}>
                    <StyledInfoContent>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={700}>
                                Full Name
                            </Text>
                            <BaseInput key={"fullName"} name="fullName"/>
                        </StyledInputGroup>

                        <Flex gap={12} className={"user-info-field"}>
                            <StyledRowInput>
                                <Text fontSize="16px" fontWeight={700}>
                                    Giới tính
                                </Text>
                                <StyledGenderSelect
                                    value={gender}
                                    onChange={handleGenderChange}
                                    options={optionsGender}
                                />

                            </StyledRowInput>
                            <StyledInputGroup className={"user-info-field"}>
                                <Text fontSize="16px" fontWeight={700}>
                                    Email
                                </Text>
                                <BaseInput name="email" placeholder="Email" disabled={true}/>
                            </StyledInputGroup>
                            <StyledInputGroup>
                                <Text fontSize="16px" fontWeight={700}>
                                    Date of Birth
                                </Text>
                                <StyledDatePicker onChange={hanldeDateChange} name="dateOfBirth" format="DD/MM/YYYY"
                                                  placeholder="Date of Birth"/>
                            </StyledInputGroup>
                        </Flex>


                        <Flex gap={12} className={"user-info-field"}>
                            <StyledRowInput>
                                <Text fontSize="16px" fontWeight={700}>
                                    Phone Code
                                </Text>
                                <PhoneNationCode defaultValue={formik.values.phoneCode} onSelect={(value, option) => {
                                    formik.setFieldValue("phoneCode", value)
                                }}/>
                            </StyledRowInput>
                            <StyledInputGroup>
                                <Text fontSize="16px" fontWeight={700}>
                                    Phone Number
                                </Text>
                                <BaseInput name="phoneNumber" placeholder="Email"/>
                            </StyledInputGroup>
                            <StyledInputGroup style={{
                                width: "30%"
                            }}>
                                <Text fontSize="16px" fontWeight={700}>
                                    Point
                                </Text>
                                <BaseInput name="point" placeholder="Email" disabled={true}/>

                            </StyledInputGroup>
                        </Flex>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Address
                            </Text>
                            <BaseInput name="address" placeholder="Address"/>
                        </StyledInputGroup>
                    </StyledInfoContent>
                </FormikProvider>

                <Flex gap={20} style={{
                    marginLeft: "auto"

                }}>
                    <Button
                        buttonType={"reverse-primary"} handleClickButton={handleReset}>
                        Reset
                    </Button>
                    <Button
                        disabled={disableEdit}
                        type="primary" handleClickButton={handleUpdate}>
                        Save
                    </Button>

                </Flex>

            </Flex>
        </UserInfoStyled>
    );
}

const UserInfoStyled = styled.div`
    width: 100%;
    padding: 20px 30px;
`

export const StyledInputGroup = styled.div`
    display: flex;
    gap: 3px;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
    & > input {
        margin-top: 10px;
    }
`

const StyledRowInput = styled.div`
    display: flex;
    gap: 3px;
    flex-direction: column;
    
`;

const StyledInfoHeader = styled(Flex)`
    padding-bottom: 10px;
    border-bottom: 1px solid ${appConfig.colors.primary}
`;
const StyledInfoContent = styled.div`
    padding-top: 10px;
`;
const StyledGenderSelect = styled(Select)`
    width: 200px;
    height: 45px;
    margin-top: 10px;

    &.ant-select-selector {
        border-radius: 12px !important;
    }
`

const StyledDatePicker = styled(DatePicker)`
    height: 45px;
    margin-top: 10px;
`;