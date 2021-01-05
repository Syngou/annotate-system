<template>
  <div>
    <Modal
      v-model="this.$store.state.showAnnotations"
      fullscreen
      :closable="false"
    >
      <div>
        <Annotations></Annotations>
      </div>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="buttonClick">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Annotations from "@/page/Home/childconps/ShowAnnotations/Annotations";

export default {
  name: "ShowAnnotations",
  components: {
    Annotations,
  },
  methods: {
    buttonClick() {
      this.$store.state.showAnnotations = false;
    },
  },
};
</script>

<style scoped>
</style>
