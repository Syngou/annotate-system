<template>
  <div class="dropDownContainer">
    <!--    TODO : 样式的命名，class类的命名-->

    <Dropdown style="margin-left: 20px; margin-top: 20px">
      <a href="javascript:void(0)">
        功能
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>待开发</DropdownItem>
        <DropdownItem>待开发</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown style="margin-left: 20px">
      <a href="javascript:void(0)">
        翻译
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>待开发</DropdownItem>
        <DropdownItem>待开发</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown style="margin-left: 20px">
      <a href="javascript:void(0)">
        工具
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>待开发</DropdownItem>
        <DropdownItem>待开发</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <span class="functionButton">
      <button @click="reduceFontSize">-</button>
      <span>字体</span>
      <button @click="addFontSize">+</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "myDropDown",
  methods: {
    // 增减字体大小
    addFontSize() {
      this.$store.state.fontSize++;
      console.log(this.$store.state.fontSize);
    },
    reduceFontSize() {
      this.$store.state.fontSize--;
      console.log(this.$store.state.fontSize);
    },
  },
};
</script>

<style scoped>
  .dropDownContainer {
    clear: both;
    position: fixed;
    background-color: #333;
    width: 100%;
    left: 0;
    z-index: 50;
  }

  .functionButton {
    display: inline;
    margin-left: 20px;
  }

  .functionButton button {
    padding: 0 10px 0 10px;
    cursor: pointer;
    background-color: rgb(14, 253, 22);
  }

  .functionButton span {
    color: white;
    margin: 0 10px 0 10px;
  }
</style>
