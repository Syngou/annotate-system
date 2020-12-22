<template>
  <div>
    <TopNavigation/>
    <ShowAnnotations></ShowAnnotations>
    <div class="main-content">
      <div class="card">
        <FunctionBar/>
        <Essays/>
        <BackTop :duration="0" :bottom="70"></BackTop>
      </div>
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
@import "../../assets/css/Home.css";
</style>
