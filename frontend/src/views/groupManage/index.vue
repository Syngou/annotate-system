<template>
  <div>
    <div class="add-button">
      <el-button type="primary" @click="showEditForm = true">
        添加成员
      </el-button>
    </div>
    <el-table
      :data="groupList"
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

      <!-- 用户名 -->
      <el-table-column align="center" label="用户名" width="300">
        <template slot-scope="scope">
          <template v-if="scope.$index == editCurrent">
            <el-input v-model="editName" size="small" />
          </template>
          <span v-else> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- 角色 -->
      <!--TODO 打算使用下拉选项 -->
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.$index == editCurrent"
            type="primary"
            size="mini"
            @click="confirmEdit"
          >
            确定
          </el-button>
          <el-button
            v-else
            size="mini"
            type="success"
            @click="handleEdit(scope.$index)"
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

    <!-- 编辑框 -->
    <div>
      <el-dialog :visible.sync="showEditForm" :width="width">
        <el-form label-position="left" label-width="80px" :model="newMember">
          <el-form-item label="成员昵称">
            <el-input v-model="newMember.name" />
          </el-form-item>
          <el-form-item label="成员角色">
            <el-input v-model="newMember.role" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addMember()">
            确定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addMember } from "@/api/group";
import { mapGetters } from "vuex";
export default {
  name: "Group",

  data() {
    return {
      newMember: {}, // 添加的成员信息
      showEditForm: false, // 显示编辑对话框
      editName: "", // 编辑的用户名
      editCurrent: -1, // 编辑的行
    };
  },
  computed: {
    // 编辑框宽度
    width() {
      return window.innerWidth <= 400 ? "80%" : "30%";
    },
    ...mapGetters(["name", "roles"]),
    groupList() {
      return [{ name: this.name, role: this.roles[0] }];
    },
  },
  methods: {
    /**
     * 表格样式
     */
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "highlight-row";
      }
      return "";
    },
    /**
     * 添加成员
     */
    addMember() {
      this.showEditForm = false;
      if (this.newMember.name && this.newMember.role) {
        // 发送新成员信息
        addMember(this.newMember).then(() => {
          this.$message.success("添加成功");
          this.groupList.push(this.newMember);
        });
      }else{
        this.$message.error("请将成员信息填写完整")
      }
    },
    /**
     * 编辑成员信息
     * @param {int} index 索引
     * @param {Object} row 当前行
     */
    handleEdit(index) {
      this.editCurrent = index;
      this.editName = this.groupList[index].name;
    },
    /**
     * 确认编辑
     */
    confirmEdit() {
      this.groupList[this.editCurrent].name = this.editName;
      this.editCurrent = -1;
    },
    /**
     * 删除成员
     * @param {int} index 索引
     */
    handleDelete(index) {
      this.$confirm("确定要删除吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.groupList.splice(index, 1);
      });
    },
  },
};
</script>
<style lang="scss">
.add-button {
  margin: 20px 20px;
}
.el-table .highlight-row {
  background: #ebf0fa;
}
</style>
