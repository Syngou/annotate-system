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
                action="http://localhost:8000/api/setAvatar/"
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
                {{ user.name }}
              </div>
            </li>

            <li>
              <SvgIcon icon-class="anq" /> 安全设置
              <div class="user-right">
                <el-button type="text" @click="dialogFormVisible=true">
                  修改密码
                </el-button>

                <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                  <el-form :model="pwdOptions">
                    <el-form-item label="旧密码" :label-width="formLabelWidth">
                      <el-input v-model="pwdOptions.oldPassword" placeholder="请输入旧密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                      <el-input v-model="pwdOptions.newPassword" placeholder="请输入新密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth">
                      <el-input v-model="pwdOptions.checkPassword" placeholder="请再次确认" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">
                      取 消
                    </el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                      确 定
                    </el-button>
                  </div>
                </el-dialog>
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
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
        };
      },
    },
  },
  data(){
    return{
      dialogFormVisible:false,
      pwdOptions:{
        oldPassword:"",
        newPassword:"",
        checkPassword:""
      },
      formLabelWidth:'80px'
    }
  },
  computed: {
    token() {
      return getToken();
    },
    ...mapGetters(["avatar"]),
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

  .dialog-footer{
    position: relative;
    left: 275px;
  }
  }
}
</style>
