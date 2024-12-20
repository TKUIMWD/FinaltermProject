export interface DishWasher{
    _id? : string,
    id : number,
    nickname : string,
    title : string,
    intro : string,
    seniority : number,
    hourly_rate : number,
    areas : Array<string> | undefined
}