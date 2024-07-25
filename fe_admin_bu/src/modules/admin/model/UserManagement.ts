import {PaginationReq} from "authentication/models/BookingHistory.ts";

export interface ManageAccountPaginationReq extends PaginationReq {
    search?: string;
    status?: string;
    roleId?: number;
}

export interface SearchFormReq{
    searchInput: string;
}
export interface ManageAccountRes {

}
export enum RoleEnum {
    ROLE_USER = 'ROLE_USER',
    ROLE_MANAGER_MASTER = 'ROLE_MANAGER_MASTER',
    ROLE_MANAGER = 'ROLE_MANAGER',
    ROLE_ADMIN_MASTER = 'ROLE_ADMIN_MASTER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_EMPLOYEE = 'ROLE_EMPLOYEE'
}
export enum UserStatusEnum {
    ACTIVE= 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    DELETED = 'DELETED'
}
export interface ManageCountRes {
    count: number;
}
export interface UserCreateRes {
    count: number;
    label: string;
}
export function formatNumber(input: string | number): string {
    // Convert input to a number if it's a string, otherwise use it as is if it's already a number
    const number = typeof input === 'string' ? parseInt(input, 10) : input;

    // Check if the conversion results in a valid number
    if (isNaN(number)) {
        return "Invalid input";  // Return a message or handle errors if the input is not a valid number
    }

    // Define 1 billion and 1 million
    const billion = 1000000000;
    const million = 1000000;

    // Determine if the number is a multiple of a billion and not zero
    if (number % billion === 0 && number !== 0) {
        const billionsCount = number / billion;
        const formattedBillion = new Intl.NumberFormat('vi-VN').format(billionsCount);
        return `${formattedBillion} tỷ`;
    } else {
        // If not exactly a billion, calculate millions even if the value is over a billion
        const millionPortion = Math.floor(number / million) % 1000;
        const formattedMillion = new Intl.NumberFormat('vi-VN').format(millionPortion);
        return `${formattedMillion} triệu`;
    }
}

export function formatNumberWithCommas(input: number | string): string {
    const parsedNumber = typeof input === 'string' ? parseFloat(input) : input;
    if (isNaN(parsedNumber)) {
        return "Invalid input"; // Trả về lỗi hoặc chuỗi rỗng nếu đầu vào không phải là số hợp lệ
    }
    return parsedNumber.toLocaleString('vi-VN');
}


