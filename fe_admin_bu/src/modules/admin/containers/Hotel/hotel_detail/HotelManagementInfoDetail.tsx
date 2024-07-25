import {AnyObject} from "antd/lib/_util/type";
import {FormikContextType, FormikProvider, useFormik} from "formik";
import {Text} from "components/typhograpy/Text.tsx";
import BaseInput from "components/form/BaseInput.tsx";
import {StyledInputGroup} from "authentication/containers/profile/UserInfor.tsx";
import {Flex, Image, message} from "antd";
import PhoneNationCode from "components/select/NationCode.tsx";
import styled from "styled-components";
import {Button} from "components/button/Button.tsx";
import {setCredentials} from "app/store/slice/authSlice.tsx";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import CloudinaryUploadWidget from "components/ImageUpload.tsx";


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
    })
});

export interface HotelManagementInfoDetailProps {
    hotelDetail: AnyObject;
}


export const HotelManagementInfoDetail = ({hotelDetail}: HotelManagementInfoDetailProps) => {

    const formik = useFormik({
        initialValues: {
            name: hotelDetail?.name,
            addressDetail: hotelDetail?.addressDetail,
            hotelAddress: {
                ward: hotelDetail?.hotelAddress.ward,
                district: hotelDetail?.hotelAddress.district,
                province: hotelDetail?.hotelAddress.province,
                nation: hotelDetail?.hotelAddress.nation,
            },
            hotelContact: {
                phoneNumberCode: hotelDetail?.hotelContact.phoneNumberCode,
                phoneNumber: hotelDetail?.hotelContact.phoneNumber,
                email: hotelDetail?.hotelContact.email,
                facebook: hotelDetail?.hotelContact.facebook,
                instagram: hotelDetail?.hotelContact.instagram
            },
            hotelInfos: {
                desEn: hotelDetail?.hotelInfos.length > 0 ? hotelDetail?.hotelInfos[1].description : "",
                desVi: hotelDetail?.hotelInfos.length > 0 ? hotelDetail?.hotelInfos[0].description : "",
            }
        } as AnyObject,
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    });
    console.log(hotelDetail)

    const handleReset = () => {
        formik.resetForm();
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
    const desEnOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        console.log(formik.values.hotelInfos.desEn)
    }


    return (

        <StyledHotelInfoDetail vertical={true}>
            <FormikProvider value={formik}>
                <h3>Thông tin khách sạn</h3>
                <Flex gap={6}>
                    <StyledInputGroup className={"user-info-field"}>
                        <Text fontSize="16px" fontWeight={600}>
                            Tên khách sạn:
                        </Text>
                        <BaseInput name="name" placeholder="Tên khách sạn.."/>
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
                        <BaseInput type={"textarea"} textAreaRows={4} name="hotelInfos.desEn" placeholder="Mô tả"
                                   handleOnChange={desEnOnChange}/>
                    </StyledInputGroup>
                    <StyledInputGroup>
                        <Text fontSize="16px" fontWeight={700}>
                            Mô tả (VN)
                        </Text>
                        <BaseInput type={"textarea"} textAreaRows={4} name="hotelInfos.desVi" placeholder="Mô tả"/>
                    </StyledInputGroup>
                </Flex>
            </FormikProvider>


            <Flex gap={20} style={{
                marginLeft: "auto"

            }}>
                <Button
                    buttonType={"reverse-primary"} handleClickButton={handleReset}>
                    Reset
                </Button>
                <Button
                    type="primary" handleClickButton={handleUpdate}>
                    Save
                </Button>

            </Flex>
        </StyledHotelInfoDetail>
    )
};
const StyledHotelInfoDetail = styled(Flex)`

`;
