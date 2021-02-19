<template>
  <div>
    <p>{{ greeting }}</p>
    <br />
    <div style="margin-left: 100px"></div>
  </div>
</template>

<script>
export default {
  name: "User",

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
    font-size: 20px;
    color: red;
  }
</style>
