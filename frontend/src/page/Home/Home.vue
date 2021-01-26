<template>
  <div>
    <TopNavigation />
    <FunctionBar />
    <Paper />
    <Remind />
    <BackTop :duration="0" :bottom="70"></BackTop>
    <Footer />
  </div>
</template>


<script>
import TopNavigation from "./childcomps/navigator/TopNavigation";
import FunctionBar from "./childcomps/FunctionBar";
import Paper from "./childcomps/Paper";
import Footer from "@/page/Home/childcomps/Footer";
import Remind from "./childcomps/Remind";

export default {
  name: "Home",
  components: {
    TopNavigation,
    FunctionBar,
    Paper,
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
