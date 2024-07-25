import {Modal} from "components/modal/Modal.tsx";
import {Button} from "components/button/Button.tsx";
import {PlusOutlined} from "@ant-design/icons";
import {FormikProvider, useFormik} from "formik";
import {AnyObject} from "antd/lib/_util/type";
import * as Yup from "yup";
import {StyledResetButton} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import {Flex, message} from "antd";
import {StyledInputGroup} from "authentication/containers/profile/UserInfor.tsx";
import BaseInput from "components/form/BaseInput.tsx";
import PhoneNationCode from "components/select/NationCode.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {useEffect, useState} from "react";
import {StyledHotelDetailImage} from "@/modules/admin/containers/Hotel/hotel_detail/HotelDetailImage.tsx";
import {useCreateHotelMutation} from "@/modules/admin/services/HotelManagementService.ts";

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Tên bắt buộc nhập'),
    addressDetail: Yup.string().trim().required('Địa chỉ bắt buộc nhập'),
    // description: Yup.string().required('Description is required'),
    hotelAddress: Yup.object({
        ward: Yup.string().trim().required('Nhập phường/xã'),
        district: Yup.string().trim().required('Nhập quận/huyện'),
        province: Yup.string().trim().required('Nhập tỉnh/thành phố'),
        nation: Yup.string().trim().required("Nhập quốc gia"),
    }),
    hotelContact: Yup.object({
        phoneNumberCode: Yup.string().required('Phone number code is required'),
        phoneNumber: Yup.string().required('Số điện thoại bắt buộc nhập'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        facebook: Yup.string().required('Facebook is required'),
        instagram: Yup.string().required('Instagram is required')
    }),
    hotelInfos: Yup.object({
        desEn: Yup.string().trim().required('Mô tả bắt buộc nhập'),
        desVi: Yup.string().trim().required('Mô tả bắt buộc nhập')
    })
});
export const AddHotelModal = () => {
    const [createHotel] = useCreateHotelMutation();
    const [cloudName] = useState("dsz00cxkk");
    const [uploadPreset] = useState("ujez4mee");
    const [uwConfig] = useState({
        cloudName,
        uploadPreset
    });
    const [urlImage, setUrlImage] = useState("");

    const [ortherImage, setOrtherImage] = useState<string[]>([]);

    useEffect(() => {
        console.log("URL", urlImage)
        if (urlImage !== "") {
            setOrtherImage([...ortherImage, urlImage]);
        }
    }, [urlImage]);

    const formik = useFormik({
        initialValues: {
            name: "",
            addressDetail: "",
            hotelAddress: {
                ward: "",
                district: "",
                province: "",
                nation: "",
            },
            hotelContact: {
                phoneNumberCode: "",
                phoneNumber: "",
                email: "",
                facebook: "",
                instagram: ""
            },
            hotelInfos: {
                desEn: "",
                desVi: "",
            }
        } as AnyObject,
        validationSchema: validationSchema,
        onSubmit: values => {
            if (ortherImage.length == 0) {
                alert("Vui lòng chọn ảnh")
            }

            const hotel = {
                name: values.name,
                addressDetail: values.addressDetail,
                hotelAddress: {
                    ward: values.hotelAddress.ward,
                    district: values.hotelAddress.district,
                    province: values.hotelAddress.province,
                    nation: values.hotelAddress.nation,
                },
                hotelContact: {
                    phoneNumberCode: values.hotelContact.phoneNumberCode,
                    phoneNumber: values.hotelContact.phoneNumber,
                    email: values.hotelContact.email,
                    facebook: values.hotelContact.facebook,
                    instagram: values.hotelContact.instagram
                },
                hotelInfo: [
                    {
                        description: values.hotelInfos.desVi,
                        langId: 2
                    },
                    {
                        description: values.hotelInfos.desEn,
                        langId: 1
                    }
                ],
                images: ortherImage.map((url, index) => ({
                    alt: "",
                    url: url,
                    isMain: index === 0
                }))
            }
            message.loading("Đang thêm khách sạn...");
            createHotel(hotel).unwrap().then((res) => {
                console.log(res);
                message.success("Thêm khách sạn thành công");
            })
                .catch((err) => {
                    switch (err.data.error) {
                        case "hotel_name_duplicate":
                            message.error("Tên khách sạn đã tồn tại");
                            formik.setFieldError("name", "Tên khách sạn đã tồn tại");
                            break;
                        default:
                            message.error("Thêm khách sạn thất bại");
                            break;
                    }
                })

        }
    });

    const handleReset = () => {
        formik.resetForm();
        setOrtherImage([])
    }
    const handleUpdate = () => {
        // dispath(setCredentials(formik.values));
        // updateAccount(formik.values)
        //     .unwrap()
        //     .then((res) => {
        //         message.success("Cập nhật thành công");
        //         console.log("Update ", res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         message.error("Cập nhật thất bại");
        //     });

    }
    return (
        <Modal
            title={"Thêm khách sạn"}
            trigger={
                <StyledResetButton style={{
                    marginLeft: "auto"
                }}>
                    <Button
                        children={
                            <>
                                {" "}
                                <span>Thêm mới</span>
                                <PlusOutlined/>
                            </>
                        }
                    />
                </StyledResetButton>

            }
            okText={"Thêm mới"}
            cancelText={"Hủy"}
            afterClose={handleReset}
            onOk={() => {
                if (formik.isValid) {
                    formik.submitForm()
                } else console.log(formik.errors)
            }}
        >
            <Flex vertical={true}>
                <FormikProvider value={formik}>
                    <Flex gap={6}>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Tên khách sạn:
                            </Text>
                            <BaseInput name="name" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Email:
                            </Text>
                            <BaseInput name="hotelContact.email" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Địa chỉ:
                            </Text>
                            <BaseInput name="addressDetail" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>

                    </Flex>
                    <Flex gap={6}>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Phường/xã:
                            </Text>
                            <BaseInput name="hotelAddress.ward" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>

                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Quận/huyện
                            </Text>
                            <BaseInput name="hotelAddress.district" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Tỉnh/thành phố;
                            </Text>
                            <BaseInput name="hotelAddress.province" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>
                        <StyledInputGroup className={"user-info-field"}>
                            <Text fontSize="16px" fontWeight={600}>
                                Quốc gia
                            </Text>
                            <BaseInput name="hotelAddress.nation" placeholder="Tên khách sạn.."/>
                        </StyledInputGroup>
                    </Flex>
                    <Flex gap={12} className={"user-info-field"}>
                        <Flex gap={3} vertical={true}>
                            <Text fontSize="16px" fontWeight={700}>
                                Mã điện thoại
                            </Text>
                            <PhoneNationCode defaultValue={formik.values.hotelContact.phoneNumberCode}
                                             onSelect={(value, option) => {
                                                 formik.setFieldValue("hotelContact.phoneNumberCode", value)
                                             }}/>
                        </Flex>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Số điện thoại
                            </Text>
                            <BaseInput name="hotelContact.phoneNumber" placeholder="Email"/>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Link Facebook
                            </Text>
                            <BaseInput name="hotelContact.facebook" placeholder="Link Facebook"/>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Link Intagram
                            </Text>
                            <BaseInput name="hotelContact.instagram" placeholder="Link Instagarm"/>
                        </StyledInputGroup>
                    </Flex>
                    <Flex gap={12}>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Mô tả (EN)
                            </Text>
                            <BaseInput type={"textarea"} textAreaRows={4} name="hotelInfos.desEn"
                                       placeholder="Mô tả"></BaseInput>
                        </StyledInputGroup>
                        <StyledInputGroup>
                            <Text fontSize="16px" fontWeight={700}>
                                Mô tả (VN)
                            </Text>
                            <BaseInput type={"textarea"} textAreaRows={4} name="hotelInfos.desVi"
                                       placeholder="Mô tả"/>
                        </StyledInputGroup>
                    </Flex>
                </FormikProvider>
                <Flex>
                    <div style={{
                        overflow: "hidden"
                    }}>
                        <Flex align={"center"} gap={12}>
                            <Text fontSize="16px" fontWeight={700}>
                                Ảnh
                            </Text>
                            <StyledHotelDetailImage uwConfig={uwConfig} setUrlImage={setUrlImage}/>
                        </Flex>
                        <div>
                            {ortherImage.map((item, index) =>
                                <>
                                    <img src={item} width={100}/>
                                </>
                            )
                            }
                        </div>
                    </div>


                </Flex>
            </Flex>
        </Modal>
    )

}