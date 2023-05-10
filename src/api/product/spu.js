///admin/product/{page}/{limit}
import request from "@/utils/request";
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });
///admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });
///admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () =>
  request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });
///admin/product/spuImageList/{spuId}
export const reqImage = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
///admin/product/baseSaleAttrList
export const reqSaleList = () =>
  request({
    url: `/admin/product/baseSaleAttrList`,
    method: "get",
  });
///admin/product/updateSpuInfo
export const reqUpdateOrSaveSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({ url:"/admin/product/updateSpuInfo", method:"post",data:spuInfo });
  }
  else{
    return request({ url:"/admin/product/saveSpuInfo", method:"post",data:spuInfo });
  }
};
//DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });

