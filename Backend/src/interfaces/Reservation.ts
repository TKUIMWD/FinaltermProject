export type reservation_status = "成立" | "未成立" | "取消" | "撤銷"

export interface Reservation {
    _id?: string,
    created_at: string,
    status: reservation_status,
    user_id: string,
    username: string,
    dish_washer_id: string,
    dish_washer_nickname: string,
    dish_washer_title: string,
    start_time: string,
    end_time: string,
    price: number,
    address: string,
}