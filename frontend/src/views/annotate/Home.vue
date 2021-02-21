<template>
  <div>
    <TopNavigation />
    <FunctionBar />
    <Essay />
    <Remind />
    <el-backtop :duration="0" :bottom="70" />
    <Footer />
  </div>
</template>


<script>
import TopNavigation from "./childcomps/navigator/TopNavigation";
import FunctionBar from "./childcomps/FunctionBar";
import Essay from "./childcomps/Essay";
import Footer from "./childcomps/Footer";
import Remind from "./childcomps/Remind";

export default {
  name: "Home",
  components: {
    TopNavigation,
    FunctionBar,
    Essay,
    Footer,
    Remind,
  },
};
</script>
<style scoped>
  * {
    box-sizing: border-box;
    color: black;
  }
</style>
