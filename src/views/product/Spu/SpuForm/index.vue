<template>
  <div>
    <el-form :model="spu" ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="(mark, index) in trade"
            :key="mark.id"
            :value="mark.id"
            :label="mark.tmName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="label">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          :on-success="onSuccess"
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="img"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrId"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrId"
          @click="addAttr"
          >添加销售属性</el-button
        >
        <el-table border :data="spu.spuSaleAttrList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column
            prop="saleAttrValueName"
            label="属性值名称列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="saveOrUpdate" type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: "",
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      trade: [],
      img: [],
      sale: [],
      attrId: "",
    };
  },
  methods: {
    onSuccess(res, file, list) {
      this.img = list;
    },
    handleRemove(file, fileList) {
      this.img = fileList;
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initSpuData(row) {
      try {
        let spuResult = await this.$API.spu.reqSpu(row.id);
        if (spuResult.code == 200) this.spu = spuResult.data;
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        if (tradeMarkResult.code == 200) this.trade = tradeMarkResult.data;
        let imageResult = await this.$API.spu.reqImage(row.id);
        if (imageResult.code == 200) {
          let listArray = imageResult.data;
          listArray.forEach((element) => {
            element.name = element.imgName;
            element.url = element.imgUrl;
          });
          this.img = listArray;
        }
        let saleResult = await this.$API.spu.reqSaleList(row.id);
        if (saleResult.code == 200) this.sale = saleResult.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    showInput(row) {
      //inputValue
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    addAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrId.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrId = "";
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性不能为空");
        rtuern;
      }
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!result) return;
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    async saveOrUpdate() {
      this.spu.spuImageList = this.img.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqUpdateOrSaveSpu(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeSence", 0);
      }
      Object.assign(this._data, this.$options.data());
    },
    async addSpuData(row, id) {
      this.spu.category3Id = id;
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) this.trade = tradeMarkResult.data;
      let saleResult = await this.$API.spu.reqSaleList(row.id);
      if (saleResult.code == 200) this.sale = saleResult.data;
    },
    cancel() {
      this.$emit("changeSence", 0);
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    unSelectSaleAttr() {
      let result = this.sale.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName != item.name;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
