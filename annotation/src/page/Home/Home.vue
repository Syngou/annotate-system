<template>
  <div>
    <TopNavigation />
    <ShowAnnotations></ShowAnnotations>
    <div class="card">
      <FunctionBar />
      <Essays />
      <BackTop :duration="0" :bottom="70"></BackTop>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNavigation from "./childconps/TopNavigation";
import FunctionBar from "./childconps/FunctionBar";
import Essays from "./childconps/Essays";
import ShowAnnotations from "@/page/Home/childconps/ShowAnnotations";
import Footer from "@/page/Home/childconps/Footer";

export default {
  name: "Home",
  components: {
    TopNavigation,
    FunctionBar,
    Essays,
    ShowAnnotations,
    Footer,
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
