<template>
  <div>
    <p>{{ greeting }}</p>
    <br />
    <p></p>
  </div>
</template>

<script>
export default {
  name: "Login",
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