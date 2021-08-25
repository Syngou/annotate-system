<template>
  <div>
    <el-card shadow="hover" class="mgb20">
      <div>
        <h1>TodoList</h1>
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
        "修改标注标签的颜色值后,标注页对应已标注的词的背景颜色跟着改变",
        "标注未完成时添加标签会清空标注数据,可能需要使用id来进行一一对应的修改",
        "提供暂存数据接口, 能够在用户标注未完成时保存数据",
        "提供用户手册（使用说明）",
        "根据始末位置进行标注",
        "考虑如何添加成员",
        "用户退出网站时提醒保存数据",
        "完善相关接口",
        "替换掉项目中的bootstrap样式",
        "属性标注",
        "关系标注",
        "翻译",
      ],
    };
  },
};
</script>

<style></style>
