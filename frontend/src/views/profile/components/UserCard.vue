<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :lg="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div>
          <div style="text-align: center;">
            <div class="el-upload">
              <img :src="user.avatar" class="avatar" alt="" />
            </div>
          </div>
          <ul class="user-info">
            <li>
              <div style="height: 100%;">
                <SvgIcon icon-class="login" /> 登录账号
                <div class="user-right">
                  {{ user.account }}
                </div>
              </div>
            </li>
            <li>
              <SvgIcon icon-class="user" /> 用户昵称
              <div class="user-right">
                {{ user.name }}
              </div>
            </li>
            <li>
              <SvgIcon icon-class="dept" /> 所属部门
              <div class="user-right">
                {{ user.institution }}
              </div>
            </li>
            <li>
              <SvgIcon icon-class="phone" /> 手机号码
              <div class="user-right">
                {{ user.phone }}
              </div>
            </li>
            <li>
              <SvgIcon icon-class="email" /> 用户邮箱
              <div class="user-right">
                {{ user.email }}
              </div>
            </li>
            <li>
              <SvgIcon icon-class="anq" /> 安全设置
              <div class="user-right">
                <a style="margin-right: 20px;">修改密码</a>
                <a>修改邮箱</a>
              </div>
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {};
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
