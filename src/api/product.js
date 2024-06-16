import request from "@/utils/request.js";

// 获取仓库列表
export const getStoresNameListService = () => {
    return request.get('/store/list')
}

// 获取供应商列表
export const getSupplierListService = () => {
    return request.get('/supplier/list')
}
// 分页查询
export const productsPageQueryService=(params)=>{
    return request.get('/product/page',{params:params})
}

// 删除产品
export const deleteProductService=(id)=>{
    return request.delete('/product/delete?id='+id)
}
// 获取产品详细信息
export const getProductInfoService=(id)=>{
    return request.get('/product/productInfo?id='+id)
}

// 更新产品信息
export const productUpdateService=(product)=>{
    return request.put('/product/update',product)
}

// 新增产品信息
export const productAddService=(product)=>{
    return request.post('/product/add',product)
}