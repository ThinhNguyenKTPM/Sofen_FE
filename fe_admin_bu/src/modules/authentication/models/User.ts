import {RoleEnum} from "@/modules/admin/component/RequireAuth.tsx";

export interface CreateAccountReq {
    fullName: string;
    phoneNumber: string;
    email: string;
    birthday: string;
    password: string;
    phoneCode: string;
}

export interface User {
    id?: string;
    email?: string;
    password?: string;
    fullName?: string;
    phoneNumber?: string;
    phoneCode?: string;
    avatar?: string;
    address?: string;
    isWomen?: boolean | undefined;
    point?: number;
    role: Role;
    dateOfBirth?: string; // You may want to use a string or Date object here depending on your preference
    createdAt?: string; // You may want to use a string or Date object here depending on your preference
    status?: string; // Assuming EUserStatus is a string enum
}

export interface Role {
    id: string,
    role: RoleEnum
}

export interface LoginRes {
    access_token: string,
    refresh_token: string,
    iat: number,
    ext: number
}

export interface LoginReq {
    username: string,
    password: string
}

export interface LogoutReq {
    email: string
}

export interface LogoutRes {
    message: string
}
