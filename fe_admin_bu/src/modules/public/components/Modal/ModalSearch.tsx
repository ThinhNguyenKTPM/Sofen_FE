import {Modal} from "components/modal/Modal.tsx";
import {Button} from "antd";
import styled from "styled-components";
import {ReactNode} from "react";
import {SearchHotel} from "public/models/Search.ts";
import {FormikProvider, useFormik} from "formik";
import {getNextDate, toDateString} from "public/utils/DateUtils.ts";
import * as yup from "yup";
import {SearchForm} from "public/components/Modal/SearchForm.tsx";
import {useNavigate} from "react-router-dom";
import {PublicSiteMap} from "public/routers/PublicSiteMap.ts";

export interface ModalSearchProps {
    triggerChildren?: ReactNode;
    onSuccess: (data: SearchHotel) => void;
}

export const ModalSearch = ({triggerChildren, onSuccess}: ModalSearchProps) => {
    const navigate = useNavigate();
    const current = new Date();
    const formik = useFormik({
        validateOnBlur: true,
        validateOnChange: true,
        initialValues: {
            checkIn: toDateString(getNextDate(current)),
            checkOut: toDateString(getNextDate(getNextDate(current))),
            adults: 2,
            children: 0,
            fromPrice: 0,
            toPrice: 0,
            roomAmount: 1,
            hotelId: ""
        } as SearchHotel,
        validationSchema: yup.object().shape({
            checkIn: yup.date().required("Check in date is required"),
            checkOut: yup.date().required("Check out date is required"),
            adults: yup.number().min(1, "At least 1 adult").required("Adults is required"),
            children: yup.number().min(0, "Children must be greater than or equal to 0").required("Children is required"),
            fromPrice: yup.number().min(0, "Price must be greater than or equal to 0").required("From price is required"),
            toPrice: yup.number().min(0, "Price must be greater than or equal to 0").required("To price is required"),
            roomAmount: yup.number().min(1, "At least 1 room").required("Room amount is required"),
            hotelId: yup.string()
                .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, "Vui long chon hotel")
                .required("Hotel is required")
        }),
        onSubmit: (values) => {
                onSuccess(values);
        }
    });
    const onChangeHotelName = (value: string) => {
        formik.setFieldValue("hotelId", value);
    }
    const onChangeCheckInDate = (value: string) => {
        formik.setFieldValue("checkIn", value);
        console.log(formik.values);
    }
    const handleSearchHotel = () => {
        if(formik.values.hotelId.length != 36){
            formik.setErrors({hotelId: "Vui lòng chọn khách sạn"})
            return;
        }
        const queryParams = new URLSearchParams({
            hotelId: formik.values.hotelId,
            checkIn: formik.values.checkIn.toString(),
            checkOut: formik.values.checkOut.toString(),
            adults: formik.values.adults.toString(),
            children: formik.values.children.toString(),
            fromPrice: formik.values.fromPrice.toString(),
            toPrice: formik.values.toPrice.toString(),
            roomAmount: formik.values.roomAmount.toString()
        });
        localStorage.setItem("searchHotel", JSON.stringify(formik.values));
        formik.resetForm();
        if(window.location.pathname === PublicSiteMap.HOTELS){
            window.location.search = queryParams.toString();
        } else {
            navigate({
                pathname: PublicSiteMap.HOTELS,
                search:`?${queryParams.toString()}`
            })
        }

    }
    return (

        <Modal
            title={"Tìm kiếm khách sạn"}
            trigger={
                <StyledButton className={"black-modal-button"}>{triggerChildren}</StyledButton>
            }
            width={"80%"}
            okText={"Tìm kiếm"}
            onOk={() => {
                if(formik.isValid){
                    handleSearchHotel();
                }

            }}
            afterClose={() => {formik.resetForm()}}
        >

                <SearchForm
                    isDisplayHotelName={true}
                    formik={formik}
                    onChangeHotelName={onChangeHotelName}
                    onChangeCheckInDate={onChangeCheckInDate}
                />
        </Modal>

    )
};
const StyledButton = styled(Button)`
    background-color: black !important;
    color: white;
    height: 50px;
    width: 200px;
    border-radius: 0;
    border: 2px solid white;
    font-size: 16px;
    text-transform: uppercase;
`;