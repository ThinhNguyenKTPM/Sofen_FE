import {useEffect, useState} from "react";
import {ManageAccountPaginationReq, SearchFormReq} from "@/modules/admin/model/UserManagement.ts";
import {CustomerFilter} from "@/modules/admin/containers/Customer/CustomerFilter.tsx";
import styled from "styled-components";
import {CustomerTable} from "@/modules/admin/containers/Customer/CustomerTable.tsx";

export const CustomerManagement = () => {
    const defaultParamsQuery: ManageAccountPaginationReq = {
        page: 1,
        size: 10,
        sort: "createdAt",
        direction: "descend",
        roleId: undefined
    }
    const [paramsQuery, setParamsQuery] = useState<ManageAccountPaginationReq>(defaultParamsQuery);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [paramsQuery]);
    const handleSelectChange = (value: string) => {
        if (value !== "TẤT CẢ") {
            setParamsQuery({...paramsQuery, status: value})
        } else {
            setParamsQuery({...paramsQuery, status: undefined})
        }
    }
    const handleReset = () => {
        setParamsQuery({page: 1, size: 10, roleId: undefined})
    }
    const handleSearch = (value: SearchFormReq) => {
        setParamsQuery({
            ...defaultParamsQuery,
            search: value.searchInput
        })
    }
    const accountTableOnChange = (params: ManageAccountPaginationReq) => {
        setParamsQuery(params);
    }
    return (
        <StyledCustomerManagement>
           <CustomerFilter
               onSuccess={handleSearch}
               onSelectChange={handleSelectChange}
               onReset={handleReset}
           />
            
            <CustomerTable paramsQuery={paramsQuery} accountTableOnChange={accountTableOnChange} />
        </StyledCustomerManagement>
    )
}
const StyledCustomerManagement = styled.div`
    height: 1000px;
`