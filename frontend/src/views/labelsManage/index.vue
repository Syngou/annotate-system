<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="labels"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <!-- 标签 -->
      <el-table-column type="index" width="50" label="序号" />
      <el-table-column label="标签" min-width="200">
        <template slot-scope="scope">
          <template v-if="scope.$index == editCurrent">
            <el-input v-model="editValue" size="small" />
          </template>
          <span v-else> {{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <!-- 标签快捷键 -->
      <el-table-column label="标签快捷键" min-width="200">
        <template slot-scope="scope">
          <template v-if="scope.$index == editCurrent">
            <el-input v-model="editShortcut" size="small" />
          </template>
          <span v-else> {{ scope.row.shortcut }}</span>
        </template>
      </el-table-column>

      <!-- 标签颜色 -->
      <el-table-column label="标签颜色" width="120">
        <span slot-scope="scope">
          <el-color-picker
            v-model="scope.row.color"
            show-alpha
            :predefine="$store.state.errorAnalysis.colorArray"
          />
        </span>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column align="center" width="350" label="操作">
        <span slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)"
          >
            删除
          </el-button>
          <span v-if="scope.$index == editCurrent">
            <el-button
              style="margin-left: 10px"
              type="success"
              size="mini"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(scope.row)"
            >
              确定
            </el-button>
            <el-button
              size="mini"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >
              取消
            </el-button>
          </span>

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
    <!-- 添加标签 -->
    <div style="margin-top: 20px">
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button class="button-new-tag" size="small" @click="showInput">
        添加新标签（按回车键添加）
      </el-button>
    </div>
    <div class="start-annotate-button">
      <el-button type="primary" @click="goToAnnotate">
        开始标注
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableSetting",
  data() {
    return {
      inputVisible: false, // 输入框的显隐
      inputValue: "", // 输入框的值
      editCurrent: -1,
      editValue: "",
      editShortcut: "",
    };
  },
  computed: {
    ...mapGetters(["labels"]),
  },
  methods: {
    /**
     * 表格样式
     */
    tableRowClassName({ row, rowIndex }) {
      row;
      if (rowIndex % 2) {
        return "success-row";
      }
      return "";
    },
    /**
     * 删除标签
     */
    handleDelete(index) {
      this.labels.splice(index, 1);
    },
    /**
     * 显示输入框
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /**
     * 添加标签
     */
    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.labels.push({
          value: inputValue,
          color: "red",
          shortcut: "0",
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
      this.editShortcut = row.shortcut;
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
      rows.shortcut = this.editShortcut;
      this.editValue = "";
      this.editShortcut = "";
      this.editCurrent = -1;
    },
    /**
     * 前往标注页面
     */
    goToAnnotate() {
      this.$store.dispatch("annotate/addLabels", this.labels);
      this.$router.push("/annotate");
    },
  },
};
</script>

<style lang="scss">
.el-table .success-row {
  background: #ebf0fa;
}

.start-annotate-button {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
