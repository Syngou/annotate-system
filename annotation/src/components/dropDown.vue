<template>
  <div>
    <div class="dropdown">
      <button class="dropbtn">下拉菜单</button>
      <div class="dropdown-content">
        <a href="//www.runoob.com">菜鸟教程 1</a>
        <a href="//www.runoob.com">菜鸟教程 2</a>
        <a href="//www.runoob.com">菜鸟教程 3</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropDown",
};
</script>

<style scoped>
  .dropbtn {
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
</style>