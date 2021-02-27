<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="8" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="16" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="操作日志" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="账号信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Timeline from "./components/Timeline";
import Account from "./components/Account";

export default {
  name: "Profile",
  components: { UserCard, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: "timeline",
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles", "institution"]),
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
        institution: this.institution,
      };
    },
  },
};
</script>
