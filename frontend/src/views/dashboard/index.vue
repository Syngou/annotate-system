<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 个人信息卡 -->
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <div class="el-upload">
              <el-upload
                class="avatar-uploader"
                :headers="{ 'annotate-system-token': token }"
                name="avatar"
                action="http://localhost:8000/api/setAvatar/"
                :show-file-list="false"
                accept="image/*"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
                <img :src="avatar" class="avatar" alt="" />
              </el-upload>
            </div>
            <div class="user-info-cont">
              <div class="user-info-name">
                {{ name }}
              </div>
            </div>
          </div>
          <div class="user-info-list">
            角色：
            <span>{{ roles[0] }}</span>
          </div>
        </el-card>
        <!-- 使用说明 -->
        <el-card>
          <h1>使用说明</h1>
          <h3>接口尚未完善,凑合着用</h3>
          <ol>
            <li>设置标注标签</li>
            <li>
              导入标注文本数据
              <ul>
                <li>编码为utf-8(后期会改为任意编码),文件格式为 .txt文件</li>
                <li>
                  为了方便演示,把文件的每一行作为一个标注数据集,之后会加上把整个文本作为一个标注数据集
                </li>
              </ul>
            </li>
            <li>点击按钮开始标注</li>
            <li>导出数据</li>
          </ol>
        </el-card>
      </el-col>
      <!-- todolist -->
      <el-col :xs="24" :sm="12" :lg="12">
        <TodoList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
import TodoList from "./components/TodoList";
export default {
  name: "Dashboard",
  components: {
    TodoList,
  },
  computed: {
    token() {
      return getToken();
    },
    ...mapGetters(["name", "avatar", "roles"]),
  },
  methods: {
    handleSuccess(response) {
      this.$store.dispatch("user/setAvatar", response.data.avatar);
    },
    handleError() {
      this.$message.error("上传失败");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}

.el-row {
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;

  &-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;

    div:first-child {
      font-size: 30px;
      color: #222;
    }
  }

  &-name {
    margin-left: -20px;
  }

  &-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;

    span {
      margin-left: 70px;
    }
  }

  .mgb20 {
    margin-bottom: 20px;
  }
}
</style>
