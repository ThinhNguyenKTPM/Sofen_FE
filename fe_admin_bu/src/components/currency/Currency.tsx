interface Props {
    format?: string;
    currency?: string;
    price: number;
}

export const Currency = ({
    format = "vi-VN",
    currency = "vnd",
    price,
}: Props) => {
    const priceFormatted = new Intl.NumberFormat(format, {
        style: "currency",
        currency: currency,
    }).format(price);
    return <>{priceFormatted}</>;
};
