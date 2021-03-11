<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :row-class-name="tableRowClassName"
      border
      fit
    >
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="论文标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="customChoice(scope.$index, list)"
            >标注</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, list)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, list)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑框 -->
    <el-dialog :visible.sync="showEditForm" :width="width">
      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="论文标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="文本">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="form.paragraph"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update()">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已完成: "success",
        未完成: "gray",
      };
      return statusMap[status];
    },
  },

  data() {
    return {
      list: null, // 数据列表
      listLoading: true, //加载效果
      showEditForm: false, //编辑框的显隐
      listEditIndex: 0, // 编辑索引

      form: {
        //编辑框数据
        title: "",
        author: "",
        paragraph: "",
      },
    };
  },
  computed: {
    // 编辑框宽度
    width() {
      return window.innerWidth <= 400 ? "80%" : "30%";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    /**
     * 获取数据
     */
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
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
     * 自定义设置
     */
    customChoice(index, list) {
      this.$store.dispatch("annotate/setTextTitle", list[index].title);
      this.$store.dispatch("annotate/setAnnotateText", list[index].paragraph);
      this.$router.push("setting");
    },
    /**
     * 前往标注页面
     */
    goToAnnotate() {
      this.$store.dispatch("annotate/resetData");
      this.$router.push("/annotate");
    },
    /**
     * 编辑
     */
    handleEdit(index, rows) {
      this.showEditForm = true;
      this.listEditIndex = index;
      this.form.author = rows[index].author;
      this.form.title = rows[index].title;
      this.form.paragraph = rows[index].paragraph;
    },
    /**
     * 更新数据
     */
    update() {
      this.list[this.listEditIndex].author = this.form.author;
      this.list[this.listEditIndex].title = this.form.title;
      this.list[this.listEditIndex].paragraph = this.form.paragraph;
      this.showEditForm = false;
    },
    /**
     * 删除文本提示
     */
    handleDelete(index, rows) {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        rows.splice(index, 1);
      });
    },
  },
};
</script>
<style>
  .el-table .success-row {
    background: #ebf0fa;
  }
</style>
