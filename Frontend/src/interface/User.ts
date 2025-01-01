export interface User{
    _id : string,
    username : string,
    password_hash : string,
    reservations : Array<string> | undefined,
    phone_num : string
    email : string
}