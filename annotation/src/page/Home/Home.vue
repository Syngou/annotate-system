<template>
  <div>
    <TopNavigation/>
    <div class="row">
      <div class="leftColumn">
        <div class="card">
          <FunctionBar/>
          <Essays/>
        </div>
      </div>
      <RightColumn ref="rightColumn" class="rightColumn"/>
    </div>
    <Footer></Footer>
  </div>
</template>


<script>
import TopNavigation from "./childconps/TopNavigation";
import FunctionBar from "./childconps/FunctionBar";
import Essays from "./childconps/Essays";
import RightColumn from "./childconps/RightColumn";
import Footer from "@/page/Home/childconps/Footer";

export default {
  name: "Home",
  components: {
    TopNavigation,
    FunctionBar,
    Essays,
    RightColumn,
    Footer,
  },


};
</script>
<style scoped>
@import "../../assets/css/Home.css";
</style>
