<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :lg="24">
      <el-card shadow="hover" class="mgb20" style="height: 252px">
        <div class="user-info">
          <img :src="user.avatar" class="user-avatar" alt />
          <div class="user-info-cont">
            <div class="user-info-name">{{ user.name }}</div>
          </div>
        </div>
        <div class="user-info-list">
          角色：
          <span>{{ user.role }}</span>
        </div>
        <div class="user-info-list">
          单位：
          <span>{{ user.institution }}</span>
        </div>
      </el-card>
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
  </el-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: "",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
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
