import {MainPage} from "public/pages/PublicPage.tsx";
import {ReactNode} from "react";

export interface BookingPageProps {
    children?: ReactNode;
}
export const BookingPage = ({children} : BookingPageProps) => {
    return (
        <MainPage>
            {children}
        </MainPage>
    );
}