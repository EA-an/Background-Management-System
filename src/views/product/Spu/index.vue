<template>
  <div>
    <el-card style="margin: 20px 0">
      <Category @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          :disabled="!id"
          @click="addSpu"
          icon="el-icon-plus"
          >添加SPU</el-button
        >
        <el-table :data="records" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="width"
            align="center"
            style="width: 80px"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                @click="addSku(row)"
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
              ></HintButton>
              <HintButton
                @click="updateSpu(row)"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看全部SKU"
                @click="checkSku(row)"
              ></HintButton>
              <el-popconfirm
                @onConfirm="deleteSpu(row)"
                title="这是一段内容确定删除吗？"
              >
                <HintButton
                  type="danger"
                  slot="reference"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除SPU"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--               <el-button type="success" icon="el-icon-plus" size="mini"></el-button> -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="handlerCurrentChange"
          @size-change="handlerSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm ref="SpuForm" @changeSence="changeSence" v-show="scene == 1" />
      <SkuForm v-show="scene == 2" @changeSence="changeSence" ref="SkuForm" />
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的列表`"
      :visible.sync="dialogTableVisible"
    >
      <el-table v-loading="loading" :data="skuList" style="width: 100%" border>
        <el-table-column prop="skuNam" width="width" label="名称"> </el-table-column>
        <el-table-column prop="price" width="width" label="价格"> </el-table-column>
        <el-table-column prop="weight" width="width" label="重量"> </el-table-column>
        <el-table-column prop="" width="width" label="默认图片">
          <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
          </template>
           </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  data() {
    return {
      loading:true,
      spu: {},
      skuList: [],
      dialogTableVisible: false,
      records: [],
      total: 0,
      id: "",
      id1: "",
      id2: "",
      page: 1,
      limit: 5,
      //0 展示spu 1展示修改添加spu 2 展示添加sku
      scene: 0,
    };
  },
  name: "SPU",
  methods: {
    getCategoryId({ li1, li2, li3 }) {
      this.id = li3;
      this.id1 = li1;
      this.id2 = li2;
      this.getList();
    },
    async getList() {
      let result = await this.$API.spu.reqSpuList(
        this.page,
        this.limit,
        this.id
      );
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handlerCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    handlerSizeChange(limit) {
      this.limit = limit;
      this.getList();
    },
    addSpu(row) {
      this.scene = 1;
      this.$refs.SpuForm.addSpuData(row, this.id);
    },
    addSku(row) {
      this.scene = 2;
      this.$refs.SkuForm.getData(this.id1, this.id2, this.id, row.id, row);
    },
    updateSpu(row) {
      this.scene = 1;
      this.$refs.SpuForm.initSpuData(row);
    },
    changeSence(scene) {
      this.getList();
      this.scene = scene;
    },
    async deleteSpu(row) {
      //reqDeleteSpu
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getList();
      }
    },
    async checkSku(row) {
      this.loading=true
      this.spu = row;
      this.dialogTableVisible = true;
      let res = await this.$API.sku.reqCheckSku(row.id);
      if (res.code == 200) {
        this.skuList = res.data;
        this.loading=false
      }
    },
  },
  components: {
    SkuForm,
    SpuForm,
  },
};
</script>

<style></style>
