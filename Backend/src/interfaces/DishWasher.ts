export type dish_washers_area = "北部" | "中部" | "南部" | "東部";

export interface DishWasher{
    _id? : string,
    id : string,
    nickname : string,
    title : string,
    intro : string,
    seniority : number,
    hourly_rate : number,
    areas : Array<string> | undefined,
    img_name?: String | undefined
}