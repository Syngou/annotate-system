<template>
  <div class="card">
    {{ data.result }}
  </div>
</template>

<script>
export default {
  name: "TranslateCard",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  width: 250px;
  min-height: 50px;
  padding: 10px 20px;
}
</style>
