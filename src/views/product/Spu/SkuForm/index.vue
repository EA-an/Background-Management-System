<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{ spu.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          v-model="skuInfo.price"
          type="number"
          placeholder="价格（元）"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input
          v-model="skuInfo.weight"
          placeholder="重量（千克）"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          rows="4"
          placeholder="描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in category"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="(value, index) in attr.attrValueList"
                :key="value.id"
                :label="value.valueName"
                :value="`${attr.id}:${value.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            v-for="(saleAttr, index) in sale"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select v-model="saleAttr.saleIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(value, index) in saleAttr.spuSaleAttrValueList"
                :key="value.id"
                :label="value.saleAttrValueName"
                :value="`${saleAttr.id}:${value.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="img"
          border
          style="width: 100%"
          @selection-change="handSelectChange"
        >
          <el-table-column type="selection" prop="prop" width="80px">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                style="width: 100px; height: 100px"
                :src="row.imgUrl"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="changeDefault(row, img)"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      imgList: [],
      img: [],
      sale: [],
      category: [],
      skuInfo: {
        category3Id: 0,
        price: 0,
        spuId: 0,
        tmId: 0,
        skuAttrValueList: [

        ],
        skuDefaultImg: "",
        skuDesc: "",
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuName: "",
        skuSaleAttrValueList: [
          {
            saleAttrId: 0,
            saleAttrValueId: 0,
          },
        ],
        weight: 0,
      },
      spu: {},
    };
  },
  methods: {
    async getData(li1, li2, li3, id, spu) {
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      let res = await this.$API.sku.reqGetImgList(id);
      if (res.code == 200) {
        let list = res.data;
        list.forEach((element) => {
          element.isDefault = 0;
        });
        this.img = list;
      }
      let res1 = await this.$API.sku.reqGetSaleAttrList(id);
      if (res1.code == 200) this.sale = res1.data;
      let res2 = await this.$API.sku.reqGteCategory(li1, li2, li3);
      if (res2.code == 200) this.category = res2.data;
    },
    handSelectChange(params) {
      this.imgList = params;
    },
    changeDefault(row, img) {
      img.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("changeSence", 0);
      Object.assign(this._data, this.$options.data());
    },
    async save() {
      const { category, skuInfo, sale, imgList } = this;
      category.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          let obj = { valueId, attrId };
          skuInfo.skuAttrValueList.push(obj);
        }
      });
      skuInfo.skuSaleAttrValueList = sale.reduce((prev, item) => {
        if (item.saleIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.saleIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      skuInfo.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      try {
        let result = await this.$API.sku.reqAddSku(skuInfo);
        if (result.code == 200) { 
            this.$message({type:'success',message:"添加成功"})
            this.$emit('changeSence',0)
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
