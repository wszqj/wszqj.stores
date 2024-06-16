// 获取近七天的数据
import request from "@/utils/request.js";

export const getDataService=(begin, end)=>{
    return request.get('/report/seven?begin='+begin+'&end='+end)
}