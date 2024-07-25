import { Modal as AntdModal, ModalFuncProps } from "antd";
import React, { ReactNode, useState } from "react";
import styled from "styled-components";

interface ModalProps extends ModalFuncProps {
    children: ReactNode;
    trigger: ReactNode;
    width?: string;
}

export const Modal = ({
    children,
    trigger,
    width,
    title,
    ...props
}: ModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {React.cloneElement(trigger as React.ReactElement, {
                onClick: showModal,
            })}

            <StyledModal
                title={<div style={{ marginTop: "20px" }}>{title}</div>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                $width={width}
                {...props}
            >
                {children}
            </StyledModal>
        </>
    );
};

const StyledModal = styled(AntdModal)<{ $width: string }>`
    width: ${({ $width }) => $width || "auto"} !important;
    max-width: 80%;
    margin-bottom: 16px;
`;
