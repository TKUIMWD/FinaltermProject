export interface AuthResponse {
    data: {
        id: string;
        username: string;
        email: string;
        phone_num: string;
        role: 'user' | 'admin';
    };
    token: string;
}