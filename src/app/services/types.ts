
export interface AuthResponse {
    user: User;
    token: string
}

export interface AuthData {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string
}


export interface User {
    _id: string;
    uuid: string;
    first_name: string;
    last_name: string;
    email_verification_token: string;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date
}

export interface GetItemsResponse {
    items: Item;
    pagination: Pagination
}

export interface Pagination {
    page: number;
    count: number
}

export interface Item {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date
}
export interface IState {
    items: Partial<Item>;
    userData: Partial<User>;
}