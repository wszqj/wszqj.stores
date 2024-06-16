import request from "@/utils/request.js";

// 客户信息的分页查询
export const customersPageQueryService = (params) => {
    return request.get('/customer/page', {params: params})
}
// 新增客户
export const customersAddService = (customer) => {
    return request.post('/customer/add', customer)
}
//更新客户信息
export const customerUpdateService = (customer) => {
    return request.put('/customer/update', customer)
}
//获取用户详细信息
export const getCustomerInfoService = (id) => {
    return request.get('/customer/customerInfo?id=' + id)
}
// 删除客户信息
export const deleteCustomerService = (id) => {
    return request.delete('/customer/delete?id=' + id)
}