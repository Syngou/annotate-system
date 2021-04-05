<template>
  <div class="app-container">
    <div class="button-group">
      <div class="button-group-item">
        <el-upload
          class="upload-demo"
          name="file"
          multiple
          accept="text/plain"
          :headers="{ 'annotate-system-token': token }"
          action="http://localhost:8000/user/annotate_text/upload/"
          :on-success="handleSuccess"
          :on-error="handleError"
          :show-file-list="false"
        >
          <el-button type="primary">
            导入数据
          </el-button>
        </el-upload>
      </div>
      <div class="button-group-item">
        <el-button type="primary" @click="exportData">
          导出数据
        </el-button>
      </div>
    </div>
    <div class="clear">
      <el-button type="danger" @click="removeAll">
        清空
      </el-button>
    </div>
    <div class="search">
      <el-input
        v-model="keywords"
        placeholder="请搜索关键词"
        class="input-with-select"
        @input="search"
      >
        <el-button slot="append" icon="el-icon-search" @click="search" />
      </el-input>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        v-loading="listLoading"
        :data="filterList"
        element-loading-text="Loading"
        :row-class-name="tableRowClassName"
        border
        fit
      >
        <!-- 序号 -->
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- 描述 -->
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <!-- 状态 -->
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
        <!-- 操作 -->
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="goToAnnotate(scope.$index)"
            >
              标注
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
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
import { getToken } from "@/utils/auth";

export default {
  name: "TableList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        已标注: "success",
        未标注: "gray",
      };
      return statusMap[status];
    },
  },

  data() {
    return {
      keywords: "", // 搜索关键词
      filterList: null, //符合条件的数据
      list: null, // 所有数据列表
      listLoading: true, //加载效果
      showEditForm: false, //编辑框的显隐
      listEditIndex: 0, // 编辑索引
      handleItemId: 0, // 操作条目的id
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
    token() {
      return getToken();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    /**
     * 上传成功的回调函数
     * @param response 响应数据
     */
    handleSuccess(response) {
      this.$message.success("上传成功");
      console.log(response);
    },
    /**
     * 上传失败回调函数
     */
    handleError() {
      this.$message.error("上传失败");
    },
    /**
     * 导出数据
     */
    //  TODO 导出数据
    exportData() {},
    /**
     * 清空文本数据
     */
    // TODO 在数据库中删除文本数据
    removeAll() {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.list = [];
        this.filterList = [];
      });
    },
    /**
     * 获取数据
     */
    fetchData() {
      this.listLoading = false;
    },
    /**
     * 搜索
     */
    search() {
      let keywords = this.keywords.trim();
      this.filterList = this.list.filter((item) =>
        item.description.includes(keywords)
      );
    },
    /**
     * 表格样式
     */
    tableRowClassName({ row, rowIndex }) {
      row;
      if (rowIndex % 2) {
        return "highlight-row";
      }
      return "";
    },
    /**
     * 前往标注页面
     */
    goToAnnotate(index) {
      this.$store.dispatch(
        "annotate/setAnnotateText",
        this.filterList[index].paragraph
      );
      this.$router.push("setting");
    },
    /**
     * 编辑
     * @param {object} row 操作当前行数据
     */
    handleEdit(index, row) {
      this.showEditForm = true;
      this.listEditIndex = index;
      this.form.description = row.description;
      this.form.paragraph = row.paragraph;
      this.handleItemId = row.id;
    },
    /**
     * 更新数据
     */
    update() {
      this.filterList[this.listEditIndex].description = this.form.description;
      this.filterList[this.listEditIndex].paragraph = this.form.paragraph;
      this.list.forEach((item) => {
        if (item.id === this.handleItemId) {
          item.description = this.form.description;
          item.paragraph = this.form.paragraph;
        }
      });
      this.showEditForm = false;
    },
    /**
     * 删除文本提示
     */
    handleDelete(index) {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let id = this.filterList[index].id;
        this.filterList.splice(index, 1);
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].id == id) {
            this.list.splice(i, 1);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
// 按钮组
.button-group {
  width: 100%;
  display: inline;
  margin: 0 20px 20px 20px;
  &-item {
    margin-right: 20px;
    display: inline-block;
  }
}
// 清空按钮
.clear {
  float: right;
  margin-bottom: 20px;
}
// 搜索框
.search {
  margin-bottom: 20px;
}
// 表格样式
.el-table .highlight-row {
  background: #ebf0fa;
}
</style>
