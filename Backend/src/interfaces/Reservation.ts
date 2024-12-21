export type reservation_status = "成立" | "未成立" | "取消" | "撤銷"

export interface Reservation {
    _id?: string,
    created_at: string,
    status: reservation_status,
    customer: string,
    dish_washer: string,
    start_time: string,
    end_time: string,
    price: number,
    address: string,
}