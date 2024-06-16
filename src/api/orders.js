import request from "@/utils/request.js";

//订单的条件分页查询
export const ordersPageQueryService = (params) => {
    return request.get('/orders/page', {params: params})
}
//订单类型列表查询
export const ordersTypeListService = () => {
    return request.get('/orders/typeList')
}
//删除订单数据
export const deleteOrderService = (id) => {
    return request.delete('/orders/delete?id=' + id)
}
//新增订单数据
export const addOrderService = (order) => {
    return request.post('/orders/add', order)
}
//更新订单数据回显
export const getOrderInfoServices = (id) => {
    return request.get('/orders/ordersInfo?id=' +id)
}
//更新订单信息
export const updateOrderService = (order) => {
    return request.put('/orders/update', order)
}