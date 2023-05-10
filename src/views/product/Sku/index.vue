<template>
  <div>
    <el-table :data="skuList" style="width: 100%" border>
      <el-table-column type="index" align="center" label="序号" width="80px">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110px">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            @click="sale(row)"
            v-if="row.isSale == 0"
            type="success"
            icon="el-icon-sort-down"
            size="mini"
          ></el-button>
          <el-button
            @click="cancel(row)"
            v-else
            type="success"
            icon="el-icon-sort-up"
            size="mini"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="info(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getData"
      :current-page="pageNum"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      style="margin-top: 20px; text-align: center"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="totalCount"
    >
    </el-pagination>
    <el-drawer size="50%" :visible.sync="drawer" :direction="direction">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              style="margin-right: 10px"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.id"
              type="success"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      totalCount: 0,
      pageNum: 1,
      pageSize: 5,
      skuList: [],
      skuInfo: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.getData();
    },
    async getData(pages = 1) {
      this.pageNum = pages;
      let res = await this.$API.sku.reqGetSkuList(this.pageNum, this.pageSize);
      if (res.code == 200) {
        this.skuList = res.data.records;
        this.totalCount = res.data.total;
        console.log(res);
      }
    },
    async sale(row) {
      let res = await this.$API.sku.reqSale(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "上架成功" });
        row.isSale = 1;
      }
    },
    async cancel(row) {
      let res = await this.$API.sku.reqSale(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
        row.isSale = 0;
      }
    },
    edit() {
      this.$message("正在开发");
    },
    async info(row) {
      let res = await this.$API.sku.reqSkuInfo(row.id);
      if (res.code == 200) {
        this.skuInfo = res.data;
        this.drawer = true;
      }
    },
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button{
  width:10px;
  height:10px;
  background-color: #bca;
  border-radius: 50%;

}
</style>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>
