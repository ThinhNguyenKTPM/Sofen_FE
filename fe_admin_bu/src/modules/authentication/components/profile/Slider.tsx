import React, {useEffect, useState} from 'react';
import {ContainerOutlined, KeyOutlined, UserOutlined,} from '@ant-design/icons';
import {Flex, Menu, MenuProps} from 'antd';
import {User} from "authentication/models/User.ts";
import styled from "styled-components";
import CloudinaryUploadWidget from "components/ImageUpload.tsx";
import {Text} from "components/typhograpy/Text.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "app/store/store.ts";
import {setCredentials} from "app/store/slice/authSlice.tsx";
import {useUpdateAccountMutation} from "authentication/services/AccountService.ts";

 type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export interface SliderProps{
    menuOnClick: (key: string) => void;
    userInfo: User | null;
    display: number;
}

export const Slider = ({menuOnClick, display} : SliderProps) => {
    const dispath = useDispatch();
    const [updateAccount] = useUpdateAccountMutation();
    const items: MenuItem[] = [
        getItem('My Profile', '1', <UserOutlined />),
        getItem('My Booking', '2',<ContainerOutlined />),
        getItem('My Password', '3', <KeyOutlined />),
    ];
    // Create a Cloudinary instance and set your cloud name.
    const userInfo: User | null = useSelector(
        (state: RootState) => state.auth.account ?? null
    );
    const [urlImage, setUrlImage] = useState(userInfo?.avatar);

    useEffect(() => {
        setUrlImage(userInfo?.avatar);
    }, [userInfo]);
    useEffect(() => {
        console.log("user image", urlImage);
        if (urlImage !== "" && userInfo) {
            dispath(setCredentials({
                ...userInfo,
                avatar: urlImage
            }));
            if(userInfo.avatar !== urlImage){
                updateAccount({
                    ...userInfo,
                    avatar: urlImage
                })
                    .unwrap()
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [urlImage]);

    const [cloudName] = useState("dsz00cxkk");
    const [uploadPreset] = useState("ujez4mee");
    const [uwConfig] = useState({
        cloudName,
        uploadPreset
    });
    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName
    //     }
    // });

    return (
        <StyledSider vertical={true}  style={{ width: "25%" }}>
            <StyledSiderProfile vertical={true} gap={6}>
                <Flex gap={10} style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <StyledAvatar >
                        <img src={userInfo?.avatar} alt="" style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}/>
                        {
                            display === 1 && <CloudinaryUploadWidget uwConfig={uwConfig} setUrlImage={setUrlImage}/>
                        }
                    </StyledAvatar>
                </Flex>
                <Text fontSize={"18px"} fontWeight={600}>
                    {userInfo?.fullName}
                </Text>
                <Text fontSize={"16px"} fontWeight={400}>
                    {userInfo?.email}
                </Text>

            </StyledSiderProfile>
            <StyledMenu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="light"
                items={items}
                onClick={(e) => menuOnClick(e.key.toString())}
            />
        </StyledSider>
    );
};
export default Slider;
const StyledSider = styled(Flex)`
    height: 100%;
    background-color: white;
`;
const StyledSiderProfile = styled(Flex)`
    border: 1px solid #f0f0f0;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 10px 20px 20px;
`

const StyledAvatar = styled.div`
    width: 120px;
    height: 120px;
    position: relative;
    padding: 6px 6px 0;

    .cloudinary-button {
        position: absolute;
        background-color: transparent;
        border-radius: 50%;
        right: -10px;
        bottom: -10px;
        cursor: pointer;
    }
`;

const StyledMenu = styled(Menu)`
    .ant-menu-inline .ant-menu-item {
        height: 50px !important;    
    }
`