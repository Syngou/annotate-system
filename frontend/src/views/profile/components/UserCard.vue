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
              <el-upload
                class="avatar-uploader"
                :headers="{ 'annotate-system-token': token }"
                name="avatar"
                action="http://localhost:8000/user/setAvatar/"
                :show-file-list="false"
                accept="image/*"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
                <img :src="avatar" class="avatar" alt="" />
              </el-upload>
            </div>
          </div>
          <ul class="user-info">
            <li>
              <SvgIcon icon-class="user" /> 用户昵称
              <div class="user-right">
                {{ name }}
              </div>
            </li>

            <li>
              <SvgIcon icon-class="anq" /> 安全设置
              <div class="user-right">
                <a>修改密码</a>
              </div>
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { getToken } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  computed: {
    token() {
      return getToken();
    },
    ...mapGetters(["name", "avatar"]),
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
