<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="24"
        :md="8"
        :lg="6"
        :xl="5"
        style="margin-bottom: 10px"
      >
      </el-col>
    </el-row>
    <updateEmail ref="email" :email="user.email" />
    <updatePass ref="pass" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        dept: {
          name: "dept",
        },
      },
    };
  },
};
</script>


<style rel="stylesheet/scss" lang="scss">
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li {
      border-bottom: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a {
        color: #317ef3;
      }
    }
  }
</style>
