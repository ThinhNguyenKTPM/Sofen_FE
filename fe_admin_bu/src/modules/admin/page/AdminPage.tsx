import {Sidebar} from "@/modules/admin/containers/Sidebar.tsx";
import {ReactNode} from "react";
import {useAppSelector} from "app/store/hook.ts";
import RequireAuth, {RoleEnum} from "@/modules/admin/component/RequireAuth.tsx";

export default function AdminPage(props: {
    className: string;
    children: ReactNode;
    defaultSelectedValue: string;
}) {
    window.scrollTo(0, 0);
    return (
        <RequireAuth allowedRole={[RoleEnum.ADMIN]}>
            <div className={`temppage-layout ${props.className}`}>
                <Sidebar defaultSelectedValue={props.defaultSelectedValue}>
                    {props.children}
                </Sidebar>
            </div>
        </RequireAuth>

    );
}

