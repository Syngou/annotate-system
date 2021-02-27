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
import TopNavigation from "./components/navigator/TopNavigation";
import FunctionBar from "./components/FunctionBar";
import Essay from "./components/Essay";
import Footer from "./components/Footer";
import Remind from "./components/Remind";

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
