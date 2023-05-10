<template>
  <div>
    <el-card style="margin: 20px 0">
      <Category @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="minn"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="minn"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <div>
            <el-button
              @click="attrValue"
              :disabled="!attrInfo.attrName"
              type="primary"
              icon="el-icon-plus"
              >添加属性</el-button
            >
            <el-button @click="isShowTable = true">取消</el-button>
          </div>
          <el-table
            style="width: 100%; margin: 20px"
            border
            :data="attrInfo.attrValueList"
          >
            <el-table-column type="index" label="序号" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="属性名称" width="width">
              <template slot-scope="{ row, $index }">
                <el-input
                  v-model="row.valueName"
                  placeholder="请输入属性值名称"
                  size="mini"
                  v-if="row.flag"
                  @blur="toLook(row)"
                  @keyup.native.enter="toLook(row)"
                  :ref="$index"
                ></el-input>
                <span
                  style="display: block"
                  v-else
                  @click="toEdit(row, $index)"
                  >{{ row.valueName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{ row, $index }">
                <el-popconfirm
                  :title="`确定删除${row.valueName}?`"
                  @onConfirm="deleteAttr($index)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="addOrUpdate" type="primary" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "loadsh/cloneDeep";
export default {
  data() {
    return {
      flag: true,
      attrList: [],
      isShowTable: true,
      id: "",
      id1:"",
      id2:"",
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  name: "Attr",
  methods: {
    getCategoryId({ li1, li2, li3 }) {
      this.id = li3;
      this.id1=li1;
      this.id2=li2;
      this.getList(li1, li2, li3);
    },
    async getList(li1, li2, li3) {
      let result = await this.$API.attr.reqGteCategory(li1, li2, li3);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    attrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.id,
        categoryLevel: 3,
      };
    },
    updateAttr(row) {
      this.attrInfo = cloneDeep(row);
      this.isShowTable = false;
      this.attrInfo.attrValueList.forEach((element) => {
        this.$set(element, "flag", false);
      });
    },
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入属性值");
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) return row.valueName == item.valueName;
      });
      if (isRepat) return;
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;

      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    deleteAttr(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async addOrUpdate() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );

      try {
        await this.$API.attr.addOrUpdateCategory(this.attrInfo);
        this.$message({ type: "success", message: "保存成功" });
        this.getList(this.id1,this.id2,this.id);
        this.isShowTable=true
      } catch (error) {
        this.$message("保存失败");
        console.error.message;
      }
    },
  },
};
</script>

<style></style>
