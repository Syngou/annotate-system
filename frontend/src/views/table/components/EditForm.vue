<template>
  <div>
    <el-dialog :visible.sync="showEditForm" :width="width">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="论文标题">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formLabelAlign.author"></el-input>
        </el-form-item>
        <el-form-item label="文本">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="formLabelAlign.paragraph"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    formLabelAlign: {
      type: Object,
      default() {
        return {
          title: "",
          author: "",
          paragraph: "",
        };
      },
    },
  },
  computed: {
    width() {
      return window.innerWidth <= 400 ? "80%" : "30%";
    },
  },
  created() {
    this.$bus.$on("showEditForm", () => {
      this.showEditForm = true;
    });
    console.log(this.width);
  },
  data() {
    return {
      showEditForm: false,
    };
  },
};
</script>

<style>
</style>