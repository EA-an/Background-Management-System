<template>
  <div>
    <el-form :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          @change="handler1"
          placeholder="活动区域"
          value="1"
          v-model="form.li1"
          :disabled="show"
        >
          <el-option
            v-for="li in list1"
            :key="li.id"
            :label="li.name"
            :value="li.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          @change="handler2"
          placeholder="活动区域"
          value="2"
          v-model="form.li2"
          :disabled="show"
        >
          <el-option
            v-for="li2 in list2"
            :key="li2.id"
            :label="li2.name"
            :value="li2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          @change="handler3"
          placeholder="活动区域"
          value="3"
          v-model="form.li3"
          :disabled="show"
        >
          <el-option
            v-for="li3 in list3"
            :key="li3.id"
            :label="li3.name"
            :value="li3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["show"],
  name: "Category",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      form: {
        li1: "",
        li2: "",
        li3: "",
      },
    };
  },
  mounted() {
    this.getCategory1();
  },
  methods: {
    async getCategory1() {
      let result = await this.$API.attr.reqGetCategory1();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    async handler1() {
      this.li2 = [];
      this.li3 = [];
      this.form.li2 = "";
      this.form.li3 = "";
      let result = await this.$API.attr.reqGetCategory2(this.form.li1);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    async handler2() {
      this.li3 = [];
      this.form.li3 = "";
      let result = await this.$API.attr.reqGetCategory3(this.form.li2);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    handler3() {
      this.$emit("getCategoryId", this.form);
    },
  },
};
</script>

<style></style>
