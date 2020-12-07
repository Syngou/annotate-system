<template>
  <div>
    <p>{{ greeting }}</p>
    <br />
    <div style="margin-left: 100px">
      <dropDown></dropDown>
    </div>
  </div>
</template>

<script>
import dropDown from "@/components/dropDown";
export default {
  name: "Login",
  components: {
    dropDown,
  },
  data() {
    return {
      greeting: "Hello,这里是登录页面",
    };
  },
};
</script>

<style scoped>
  @import "../assets/css/Login.css";
</style>