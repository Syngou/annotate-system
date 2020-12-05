<template>
  <div>
    <p>{{ greeting }}</p>
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
  * {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
    color: aqua;
    line-height: 100vh;
    font-size: 50px;
  }
</style>