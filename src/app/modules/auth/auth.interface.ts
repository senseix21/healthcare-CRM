
export type ILoginUser = {
    email: string;
    password: string;
}

export type ILoginResponse = {
    role: string,
    token: string;
}

export type IRefreshTokenResponse = {
    accessToken: string;
}