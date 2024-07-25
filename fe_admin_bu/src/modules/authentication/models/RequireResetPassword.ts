export interface RequireResetPasswordReq {
    email: string;
}
export interface RequireResetPasswordRes {
    message: string;
}

export interface CheckOPTReq {
    otp: string;
    email: string;
}
export interface ChangePasswordReq {
    email: string;
    password: string;
    newPassword: string;
}
