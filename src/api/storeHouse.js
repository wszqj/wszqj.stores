import request from "@/utils/request.js";

//仓库信息的条件分页查询查询
export const getStoreHouseListService = (params) => {
    return request.get('/store/page', {params: params})
}

//仓库状态的列表查询
export const getStoreHouseStateListService = () => {
    return request.get('/store/stateList')
}

//删除仓库信息
export const deleteStoreHouseService = (id) => {
    return request.delete('/store/delete?id=' + id)
}
//新增仓库信息
export const addStoreHouseService = (store) => {
    return request.post('/store/add', store)
}
//获取用户的详细信息
export const getStoreHouseInfoService = (id) => {
    return request.get('/store/storesInfo?id=' + id);
}
// 更新仓库信息
export const updateStoreHouseService=(store)=>{
    return request.put('/store/update',store)
}