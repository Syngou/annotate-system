<template>
  <div>
    <el-card shadow="hover" class="mgb20">
      <div>
        <h1>todos</h1>
      </div>
      <div v-for="(item, index) in todos" :key="index">
        <li>
          {{ item }}
        </li>
        <hr />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      todos: [
        "修改标注分类的颜色值后,标注页对应已标注的词的背景颜色跟着改变",
        "完善相关接口",
        "除去项目中的bootstrap样式",
        "改进错误分析函数，直接读取数据而不需要读文件",
        "属性标注",
        "关系标注",
        "翻译",
      ],
    };
  },
};
</script>

<style></style>
