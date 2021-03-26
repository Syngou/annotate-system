<template>
  <div class="app-container">
    <div class="button-group">
      <el-button type="primary" @click="inputData">
        导入数据
      </el-button>
      <el-button type="primary" @click="outputData">
        导出数据
      </el-button>
    </div>
    <!-- 表格 -->
    <div>
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
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="状态"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="customChoice(scope.$index, list)"
            >
              标注
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, list)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, list)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑框 -->
    <el-dialog :visible.sync="showEditForm" :width="width">
      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="文本">
          <el-input
            v-model="form.paragraph"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update()">
          更新
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import Cookies from "js-cookie";

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
        description: "",
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
     * 导入数据
     */
    //  TODO 导入数据
    inputData() {},
    /**
     * 导出数据
     */
    //  TODO 导出数据
    outputData() {},
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
      row;
      if (rowIndex % 2) {
        return "success-row";
      }
      return "";
    },
    /**
     * 自定义设置
     */
    customChoice(index, list) {
      this.$store.dispatch("annotate/setAnnotateText", list[index].paragraph);
      if (Cookies.get("annotate-custom-setting")) {
        this.$router.push("/annotate");
      } else {
        this.$router.push("setting");
      }
    },
    /**
     * 编辑
     */
    handleEdit(index, rows) {
      this.showEditForm = true;
      this.listEditIndex = index;
      this.form.description = rows[index].description;
      this.form.paragraph = rows[index].paragraph;
    },
    /**
     * 更新数据
     */
    update() {
      this.list[this.listEditIndex].description = this.form.description;
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
.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.el-table .success-row {
  background: #ebf0fa;
}
</style>
