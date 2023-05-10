import request from "@/utils/request";
///admin/product/spuImageList/{spuId}
export const reqGetImgList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
///admin/product/spuSaleAttrList/{spuId}
export const reqGetSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
///admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGteCategory = (li1, li2, li3) =>
  request({
    url: `/admin/product/attrInfoList/${li1}/${li2}/${li3}`,
    method: "get",
  });
///admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) =>
  request({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data:skuInfo
  });
///admin/product/findBySpuId/{spuId}
export const reqCheckSku = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });
  ///admin/product/list/{page}/{limit}
  export const reqGetSkuList = (page,limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });
  ///admin/product/onSale/{skuId}
  export const reqSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get",
  });
  ///admin/product/cancelSale/{skuId}
  export const reqCancelSale = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get",
  });
///admin/product/getSkuById/{skuId}
export const reqSkuInfo = (skuId) =>
request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: "get",
});
