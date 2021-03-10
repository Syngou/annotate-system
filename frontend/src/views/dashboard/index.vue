<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <img :src="avatar" class="user-avatar" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ name }}</div>
            </div>
          </div>
          <div class="user-info-list">
            角色：
            <span>{{ roles[0] }}</span>
          </div>
          <div class="user-info-list">
            单位：
            <span>{{ institution }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" style="height: 252px">
          <div slot="header" class="clearfix">
            <span>标注结果</span>
          </div>
          关系
          <el-progress :percentage="71.3" color="#42b983"></el-progress>疾病
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>药物
          <el-progress :percentage="13.7"></el-progress>器械
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
        <todo-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoList from "./TodoList/index";
export default {
  name: "Dashboard",
  components: {
    TodoList,
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles", "institution"]),
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
  .user-avatar {
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
