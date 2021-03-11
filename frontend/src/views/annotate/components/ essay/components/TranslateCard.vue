<template>
  <div>
    <el-card shadow="hover">
      <ul>
        <li>{{ result.code }}</li>
        <li>{{ result.message }}</li>
        <li>{{ result.data }}</li>
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
        return "translate result";
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>
