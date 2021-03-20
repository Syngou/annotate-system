<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="hover" class="mgb20" style="height: 252px;">
          <div class="user-info">
            <img :src="avatar" class="user-avatar" alt />
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
          <div class="user-info-list">
            单位：
            <span>{{ institution }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",

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
