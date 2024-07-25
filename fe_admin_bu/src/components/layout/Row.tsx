import {Row as AntdRow, RowProps as AntRowProps} from "antd";

const RowPaddingConfig: any = {
    small: {x: {sm: 12, md: 12, lg: 16, xl: 20}, y: {sm: 12, md: 12, lg: 16, xl: 20}},
    middle: {x: {sm: 16, md: 20, lg: 20, xl: 29}, y: {sm: 16, md: 20, lg: 20, xl: 29}},
    large: {x: {sm: 24, md: 32, lg: 32, xl: 60}, y: {sm: 24, md: 32, lg: 32, xl: 60}}
}

interface RowProps extends AntRowProps {
    size?: "small" | "middle" | "large"
}

const Row = ({size, gutter, ...props}: RowProps) => {
    const rowPadding = size === "small" ? RowPaddingConfig.small : size === "middle" ? RowPaddingConfig.middle : size === "large" ? RowPaddingConfig.large : RowPaddingConfig.small;


    return <AntdRow gutter={0} {...props}

    />
};


export default Row;