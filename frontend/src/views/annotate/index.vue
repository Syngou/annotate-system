<template>
  <div>
    <TopNavigation />
    <AnnotateContent />
    <div class="footer">
      Copyright &copy; Syngou
    </div>
  </div>
</template>

<script>
import TopNavigation from "./components/navigator/TopNavigation";
import AnnotateContent from "./components/annotateContent/AnnotateContent";

export default {
  name: "Annotate",
  components: {
    TopNavigation,
    AnnotateContent,
  },
  mounted() {
    this.isPC();
  },
  methods: {
    /**
     *  判断是否是电脑
     */
    isPC() {
      let Agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
      let userAgentInfo = navigator.userAgent;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          this.$message.warning({
            message: "手机是无法进行标注的哦,请使用电脑浏览器。",
            duration: 5000,
            showClose: true,
          });
          break;
        }
      }
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  color: black;
}

/* 底部 */
.footer {
  padding: 20px;
  background: #68768a;
  color: white;
  AnnotateContent-align: center;
}
</style>
