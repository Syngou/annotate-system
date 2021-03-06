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
            @click="handleAnnotate(scope.$index, list)"
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
    <edit-form />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import EditForm from "./components/EditForm";

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
      list: null,
      listLoading: true, //加载效果
    };
  },
  components: {
    EditForm,
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
     * 标注文本
     */
    handleAnnotate(index, rows) {
      console.log(index, rows[index]);
      this.$store.state.annotate.inputContent = rows[index].paragraph;
      this.$store.dispatch("annotate/resetData");
      this.$router.push("/annotate");
    },
    /**
     * 编辑
     */
    handleEdit(index, rows) {
      this.$bus.$emit("showEditForm");
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
        this.$message({
          type: "success",
          message: "删除成功!",
        });
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
