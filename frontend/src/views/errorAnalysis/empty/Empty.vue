<template>
  <div class="empty-container">
    <router-link to="/errorAnalysis">
      <span class="empty-text">
        点击上传文件
      </span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.empty-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .empty-text {
    color: rgb(255, 81, 0);
    font-size: 30px;
  }
}
</style>
