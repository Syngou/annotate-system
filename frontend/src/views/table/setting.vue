<template>
  <div class="app-container">
    <el-form label-position="top" label-width="80px" :model="settingForm">
      <el-form-item label="文本标题">
        <span>{{ settingForm.textTitle }}</span>
      </el-form-item>
      <el-form-item>
        <div>
          <router-link to="/annotate">
            <el-button type="primary"> 开始标注</el-button></router-link
          >
        </div>
      </el-form-item>
      <el-form-item label="标注分类">
        <el-table
          ref="singleTable"
          :data="$store.state.annotate.labelsInfo"
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column label="分类文字">
            <template slot-scope="scope">
              <template v-if="scope.$index == editCurrent">
                <el-input v-model="editValue" class="edit-input" size="small" />
                <el-button
                  class="cancel-btn"
                  size="small"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEdit(scope.row)"
                >
                  取消
                </el-button>
              </template>
              <span v-else> {{ scope.row.value }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分类颜色" width="120">
            <span slot-scope="scope">
              <el-color-picker
                v-model="scope.row.color"
                show-alpha
                :predefine="$store.state.annotate.colorArray"
              />
            </span>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <span slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)"
                >删除</el-button
              >
              <el-button
                v-if="scope.$index == editCurrent"
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(scope.row)"
              >
                确定
              </el-button>
              <el-button
                v-else
                type="primary"
                size="small"
                icon="el-icon-edit"
                @click="edit(scope.row, scope.$index)"
              >
                编辑
              </el-button>
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
            >添加新分类（按回车键添加）</el-button
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
      editCurrent: -1,
      editValue: "",
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
     * 删除分类
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
     * 添加分类
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
    /**
     * 编辑
     */
    edit(row, index) {
      this.editValue = row.value;
      this.editCurrent = index;
    },
    /**
     * 取消编辑
     */
    cancelEdit() {
      this.editCurrent = -1;
    },
    /**
     * 确认编辑内容
     */
    confirmEdit(rows) {
      rows.value = this.editValue;
      this.editValue = "";
      this.editCurrent = -1;
    },
  },
};
</script>

<style>
  .el-table .success-row {
    background: #ebf0fa;
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 20px;
  }
</style>