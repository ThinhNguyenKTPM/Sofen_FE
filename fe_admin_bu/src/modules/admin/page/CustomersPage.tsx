import AdminPage from "@/modules/admin/page/AdminPage.tsx";
import {Title} from "components/typhograpy/Title.tsx";
import {CustomerManagement} from "@/modules/admin/containers/Customer/CustomerManagement.tsx";
import {Flex} from "antd";
import styled from "styled-components";

const editStatus = [
  {
    value: "TẤT CẢ",
    label: "TẤT CẢ",
  },
  {
    value: "INACTIVE",
    label: "INACTIVE",
  },
  {
    value: "ACTIVE",
    label: "ACTIVE",
  },
  {
    value: "DEACTIVATED",
    label: "DEACTIVATED",
  },
];
export const CustomersPage = () => {

  return (
    <AdminPage
        className="customers-page"
        defaultSelectedValue={"Khách hàng"}
    >
      <StyledCustomersPage
        vertical={true}
      >
        <Title children={"Quản lý tài khoản khách hàng"} level={5}/>
        <CustomerManagement />
      </StyledCustomersPage>

    </AdminPage>
  )
}
const StyledCustomersPage = styled(Flex)`
   

`;
