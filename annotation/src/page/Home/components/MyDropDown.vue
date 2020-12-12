<template>
  <div style="clear: both">
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
  </div>
</template>

<script>
export default {
  name: "myDropDown",
};
</script>

<style scoped>
</style>
