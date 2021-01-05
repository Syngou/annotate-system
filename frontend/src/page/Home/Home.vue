<template>
  <div>
    <TopNavigation/>
    <div class="card">
      <FunctionBar/>
      <Paper/>
      <BackTop :duration="0" :bottom="70"></BackTop>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNavigation from "./childconps/TopNavigation";
import FunctionBar from "./childconps/FunctionBar";
import Paper from "./childconps/Paper";
import Footer from "@/page/Home/childconps/Footer";

export default {
  name: "Home",
  components: {
    TopNavigation,
    FunctionBar,
    Paper,
    Footer,
  },
  created() {
    this.isPC();
  },
  methods: {
    isPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          this.$Message.info({
            content: "手机是无法进行标注的哦,请使用电脑浏览器。",
            duration: 10,
            closable: true,
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

p {
  word-break: break-all;
  word-wrap: break-word;
}

.card {
  margin-top: 20px;
  padding: 20px;
}
</style>
