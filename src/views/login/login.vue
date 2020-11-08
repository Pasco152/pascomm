<template>
  <div class="login">
      <div class="left">
          <div class="title">
              <img src="@/assets/img/login_logo.png" alt="">
              <span class="titleName">黑马面面</span>
              <span class="titleLine">|</span>
              <span class="titleName2">用户登录</span>
          </div>
      </div>
      <div class="right">
          <img src="@/assets/img/login_img.png" alt="">
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
        .title {
            display: flex;
            align-items: center;
            .titleName {
                font-size: 24px;
                font-weight: 400;
                color: rgba(12,12,12,1);
                margin: 0 15px;
            }
            .titleName2 {
                font-size: 22px;
                font-weight: 400;
                color: rgba(12,12,12,1);
                margin: 0 15px;
            }
        }
    }
</style>