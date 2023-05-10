<template>
  <div>
    <!--按钮-->
    <el-button
      @click="showDialog"
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      >添加</el-button
    >
    <!--表格-->
    <el-table :data="list" style="width: 100%" border>
      <!--el表格中是一列一列的
      boder是添加边框
      column属性
      label标题
      width修改列宽
      align标题对齐方式
      -->
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="评判LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            @click="updateTrademark(row)"
            type="warning"
            icon=" el-icon-edit"
            size="mini"
            >修改</el-button
          >
          <el-button
            @click="deletetrademark(row)"
            type="danger"
            icon=" el-icon-delete"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
        layout可以调整分页器布局
     -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :pager-count="7"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="margin-top: 20px; text-align: center"
      @current-change="handleCurrentChange"
      @size-change="handSizeChange"
    >
    </el-pagination>
    <!-- 对话框 
    dialogFormVisible控制显示与隐藏-->
    <!--              -->
    <!-- el-upload用来上传的组件
        action上传地址
        :on-success="handleAvatarSuccess"
        上传成功触发
        :before-upload="beforeAvatarUpload"
        上传之前触发

     -->
    <!-- 
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
      并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator
      -->
    <el-dialog
      :title="tmform.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" :rules="rules" style="width: 80%" :model="tmform">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmform.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorupdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      list: [],
      total: 0,
      dialogFormVisible: false,
      //收集品牌信息
      tmform: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      //require 必须校验跟前面五角星有关 message提升信息， trigger用户行为设置 blur聚焦或失焦  change文本发生变化
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        //由于这个不存在用户行为 所以可以去掉 trigger
        logoUrl: [{ required: true, message: "请使用品牌图片" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let result = await this.$API.trademark.reqTradeMarkList(
        this.page,
        this.limit
      );
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    handleCurrentChange(pager) {
      this.page = pager;
      this.getList();
    },
    handSizeChange(limit) {
      this.limit = limit;
      this.getList();
    },
    showDialog() {
      this.tmform = { tmName: "", logoUrl: "" };
      this.dialogFormVisible = true;
    },
    updateTrademark(row) {
      this.dialogFormVisible = true;
      this.tmform = { ...row };
    },
    handleAvatarSuccess(res, file) {
      this.tmform.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addorupdate() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddTradeMark(this.tmform);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmform.id ? "修改成功" : "添加成功",
            });
            this.getList();
          } else {
            return Promise.reject(new Error("faile"));
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deletetrademark(row) {
      this.$confirm(`确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList()
          } else {
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
