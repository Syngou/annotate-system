<template>
  <div>
    <Modal v-model="introduceModal" title="功能介绍" :mask-closable="false">
      <List border>
        <ListItem
          >按下鼠标，滑过文本，松开，即可标注文本,右栏实时显示标注的文本</ListItem
        >
        <ListItem>也可以选择使用快捷键标注.</ListItem>
        <ListItem>对应快捷键：</ListItem>
        <ListItem>
          <Tag color="error">红：r(red); </Tag>
          <Tag color="primary">蓝：b(blue); </Tag>
          <Tag color="success">绿：g(green); </Tag>
          <Tag color="warning">橙：o(orange)</Tag>
        </ListItem>
      </List>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="introduceModal = false">我知道了</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Introduce",
  created() {
    this.$bus.$on("showIntroduce", () => {
      this.introduceModal = true;
    });
    this.haveRead();
  },
  data() {
    return {
      introduceModal: false, //功能介绍
    };
  },
  methods: {
    haveRead() {
      if (document.cookie.indexOf("haveRead") == -1) {
        this.introduceModal = true;
        document.cookie = "haveRead=true;expires=Thu, 18 Dec 2100 12:00:00 GMT";
      }
    },
  },
};
</script>

<style scoped>
</style>
