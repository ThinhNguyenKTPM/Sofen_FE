import {Col, Flex} from "antd";
import { FlexProps } from "antd";
import React from "react";
import Row from "../../../components/layout/Row.tsx";
// import Col from "../../../components/layout/Col.tsx";

export interface ContainerProps extends FlexProps {
    contentDesktopCols?: number;
    contentMobileCols?: number;
    backgroundColor?: string;
    height?: string;
    isCenter?: boolean;
    children: React.ReactNode;
}

export const Container = ({
    children,
    contentDesktopCols = 20,
    contentMobileCols = 22,
    backgroundColor,
    height,
    ...props
}: ContainerProps) => {
    return (
        <Row
            style={{
                backgroundColor: backgroundColor || "unset",
                height: height || "auto",
            }}
        >
            <Col
                xs={1}
                sm={(24 - contentMobileCols) / 2}
                md={(24 - contentMobileCols) / 2}
                lg={(24 - contentDesktopCols) / 2}
                xl={(24 - contentDesktopCols) / 2}
            ></Col>
            <Col
                xs={contentMobileCols}
                sm={contentMobileCols}
                md={contentMobileCols}
                lg={contentDesktopCols}
                xl={contentDesktopCols}
            >
                <Flex
                    style={{
                        flexDirection: "column",
                        ...props.style,
                    }}
                    {...props}
                >
                    {children}
                </Flex>
            </Col>
            <Col
                xs={1}
                sm={(24 - contentMobileCols) / 2}
                md={(24 - contentMobileCols) / 2}
                lg={(24 - contentDesktopCols) / 2}
                xl={(24 - contentDesktopCols) / 2}
            ></Col>
        </Row>
    );
};
