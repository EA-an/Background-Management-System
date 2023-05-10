import request from "@/utils/request";
//GET /admin/product/get/category1/{id}
export const reqGetCategory1=()=>request({
    url:"/admin/product/getCategory1",
    method:"get"
})
export const reqGetCategory2=(id)=>request({
    url:`/admin/product/getCategory2/${id}`,
    method:"get"
})
export const reqGetCategory3=(id2)=>request({
    url:`/admin/product/getCategory3/${id2}`,
    method:"get"
})
export const reqGteCategory=(li1,li2,li3)=>request({
    url:`/admin/product/attrInfoList/${li1}/${li2}/${li3}`,
    method:"get"

})
export const addOrUpdateCategory=(data)=>request({
    url:`/admin/product/saveAttrInfo`,
    method:"post",
    data

})