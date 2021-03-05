<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <div id="div">
      <ul>
        <li>error_type:</li>
        <li>annotateModules:</li>
        <li>author:</li>
      </ul>
    </div>
    <div class="item" @mousemove="track" @mouseleave="left">
      把鼠标移动到我身上来看看
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    track() {
      let div = document.getElementById("div");
      let intX = window.event.clientX;
      let intY = window.event.clientY;
      div.style.left = intX - 120 + "px";
      div.style.top = intY - 20 + "px";
      div.style.display = "block";
    },
    left() {
      let div = document.getElementById("div");
      div.style.display = "none";
    },
  },
};
</script>

<style>
  #div {
    border: 1px solid black;
    width: 200px;
    height: 120px;
    position: absolute;
    display: none;
  }
  .item {
    background-color: aqua;
    width: 100px;
    height: 100px;
  }
</style>