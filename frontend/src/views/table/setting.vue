<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="settingForm">
      <el-form-item label="文本标题">
        <span>{{ settingForm.textTitle }}</span>
      </el-form-item>
      <el-form-item label="标签">
        <el-table
          ref="singleTable"
          :data="$store.state.annotate.labelsInfo"
          :row-class-name="tableRowClassName"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column label="标签文字">
            <span slot-scope="scope"> {{ scope.row.value }}</span>
          </el-table-column>

          <el-table-column label="标签颜色" width="120">
            <span slot-scope="scope">
              <el-color-picker
                v-model="scope.row.color"
                show-alpha
                :predefine="$store.state.annotate.colorArray"
              />
            </span>
          </el-table-column>
          <el-table-column label="操作">
            <span slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)"
                >删除</el-button
              >
            </span>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >添加新标签（按回车键添加）</el-button
          >
        </div>
      </el-form-item>
      <el-form-item>
        <div>
          <router-link to="/annotate">
            <el-button type="primary"> 开始标注</el-button></router-link
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      settingForm: {
        textTitle: this.$store.state.annotate.textTitle
          ? this.$store.state.annotate.textTitle
          : "尚未选择标注文本",
      },
      inputVisible: false, //输入框的显隐
      inputValue: "", //输入框的值
    };
  },
  methods: {
    /**
     * 表格样式
     */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "success-row";
      }
      return "";
    },
    /**
     * 删除标签
     */
    handleDelete(index) {
      this.$store.state.annotate.labelsInfo.splice(index, 1);
    },
    /**
     * 显示输入框
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /**
     * 添加标签
     */
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$store.state.annotate.labelsInfo.push({
          value: inputValue,
          color: "red",
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style>
  .el-table .success-row {
    background: #ebf0fa;
  }
</style>