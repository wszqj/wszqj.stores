import request from "@/utils/request.js";

// 供应商的列表查询
export const supplierListService = (params) => {
    return request.get('/supplier/page', {params: params})
}
// 删除供应商信息
export const deleteSupplierService = (id) => {
    return request.delete('/supplier/delete?id=' + id)
}
// 添加供应商
export const supplierAddService = (supplier) => {
    return request.post('/supplier/add', supplier)
}
// 更新供应商信息
export const supplierUpdateService = (supplier) => {
    return request.put('/supplier/update', supplier)
}
// 获取供应商详细信息
export const getSupplierInfoService=(id)=>{
    return request.get('/supplier/supplierInfo?id='+id)
}