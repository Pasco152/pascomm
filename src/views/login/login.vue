<template>
  <div class="login">
      <div class="left"></div>
      <div class="right">
          <img src="@/assets/img/login_banner_ele.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:"login"
}
</script>

<style lang="less">
    .login {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        background: linear-gradient(225deg,rgba(20,147,250,1),rgba(1,198,250,1));
    }
    .left {
        width: 478px;
        height: 550px;
        padding: 42px;
        background-color: #f5f5f5;
    }
</style>