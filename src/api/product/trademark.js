import request from "@/utils/request";
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

export const reqAddTradeMark = (trademark) => {
  if (trademark.id) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: "put",
      data: trademark,
    });
  } else {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: "post",
      data: trademark,
    });
  }
};
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
