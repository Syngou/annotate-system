<template>
  <div>
    <el-card shadow="hover">
      <ul>
        <li>{{ result.text }}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TranslateCard",
  props: {
    result: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped></style>
