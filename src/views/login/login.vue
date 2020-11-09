<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt="" />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form :model="form" class="form">
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="form.code"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/login_code.jpg" class="key" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登陆</el-button>
          <br>
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_img.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      form: {
        phone: "",
        password: "",
        code: "",
        isCheck: "",
      },
    };
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
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
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    .form {
      padding-top: 30px;
      .code {
        width: 100%;
        height: 40px;
        padding-top: 3px;
        border: 1px dashed #ccc;
      }
      .color1 {
        color: #3296fa;
      }
      .btn {
        width: 100%;
      }
      .btn:last-child {
        margin-top: 26px;
      }
    }
  }
}
</style>