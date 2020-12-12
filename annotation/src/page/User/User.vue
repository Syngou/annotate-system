<template>
  <div>
    <p>{{ greeting }}</p>
    <br />
    <div style="margin-left: 100px">
      <dropDown></dropDown>
    </div>
  </div>
</template>

<script>
import dropDown from "@/page/Home/components/MyDropDown";
export default {
  name: "User",
  components: {
    dropDown,
  },
  data() {
    return {
      greeting: "Hello,这里是登录页面",
    };
  },
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    color: aqua;
  }
</style>
