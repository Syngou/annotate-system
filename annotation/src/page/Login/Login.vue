<template>
  <div id="container">
    <form action="/user" class="login" method="post">
      <h2>用户登录</h2>
      <div class="login_box">
        <input name="name" type="text" required /><label>用户名</label>
      </div>
      <div class="login_box">
        <input name="password" type="password" required="required" /><label
          >密码</label
        >
      </div>
      <label>
        <input type="submit" href="javascript:void(0)" value="登录" />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </label>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  * {
    /* 初始化 清除页面元素的内外边距 */
    padding: 0;
    margin: 0;
    /* 盒子模型 */
    box-sizing: border-box;
  }
  #container {
    /* 弹性布局 让页面元素垂直+水平居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 让页面始终占浏览器可视区域总高度 */
    height: 100vh;
    /* 背景渐变色 */
    background: linear-gradient(#141e30, #243b55);
  }
  .login {
    /* 弹性布局 让子元素称为弹性项目 */
    display: flex;
    /* 让弹性项目垂直排列 原理是改变弹性盒子的主轴方向 父元素就是弹性盒子 现在改变后的主轴方向是向下了 */
    flex-direction: column;
    /* 让弹性项目在交叉轴方向水平居中 现在主轴的方向是向下 交叉轴的方向是与主轴垂直 交叉轴的方向是向右 */
    align-items: center;
    width: 400px;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
  }
  .login h2 {
    color: #fff;
    margin-bottom: 30px;
  }
  .login .login_box {
    /* 相对定位 */
    position: relative;
    width: 100%;
  }
  .login .login_box input {
    /* 清除input框自带的边框和轮廓 */
    outline: none;
    border: none;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #fff;
    /* 背景颜色为透明色 */
    background-color: transparent;
  }

  .login .login_box input:-webkit-autofill,
  .login .login_box input:-webkit-autofill:hover,
  .login .login_box input:-webkit-autofill:focus,
  .login .login_box input:-webkit-autofill:active {
    transition-delay: 99999s;
    transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-transition-delay: 99999s;
    -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    -webkit-text-fill-color: #fff;
  }
  .login .login_box label {
    position: absolute;
    top: -25px;
    left: 0;
    padding: 10px 0;
    color: #03e9f4;
    font-size: 15px;
    /* 这个属性的默认值是auto 默认是这个元素可以被点击 但是如果我们写了none 就是这个元素不能被点击 , 就好像它可见但是不能用 可望而不可即 */
    /* 这个就是两者的区别 */
    pointer-events: none;
  }

  .login input[type="submit"] {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0);
    color: #03e9f4;
    /* 同样加个过渡 */
    transition: all 0.5s;
  }
  .login input[type="submit"]:hover {
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    background-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
      0 0 100px #03e9f4;
  }
  .login input[type="submit"] span {
    position: absolute;
  }
  .login input[type="submit"] span:first-child {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    /* to right 就是往右边 下面的同理 */
    background: linear-gradient(to right, transparent, #03e9f4);
    /* 动画 名称 时长 linear是匀速运动 infinite是无限次运动 */
    animation: move1 1s linear infinite;
  }
  .login input[type="submit"] span:nth-child(2) {
    right: 0;
    top: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(transparent, #03e9f4);
    /* 这里多了个0.25s其实是延迟时间 */
    animation: move2 1s linear 0.25s infinite;
  }
  .login input[type="submit"] span:nth-child(3) {
    right: -100%;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, transparent, #03e9f4);
    animation: move3 1s linear 0.5s infinite;
  }
  .login input[type="submit"] span:last-child {
    left: 0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(#03e9f4, transparent);
    animation: move4 1s linear 0.75s infinite;
  }
  /* 写一下动画 再坚持一下 视频马上就完了 */
  @keyframes move1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }
  @keyframes move2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }
  @keyframes move3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }
  @keyframes move4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
</style>