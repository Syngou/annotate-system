<template>
  <div>
    <el-card shadow="hover">
      {{result}}
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TranslateCard",
  props:{
    result: {
      type: String,
      default(){
        return "translate result";
      }
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
