<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/login_logo.png" alt="" />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登录</span>
      </div>
      <el-form :model="form" class="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="form.code"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="codeUrl" class="code" alt @click="codeClick" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="registerClick"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_img.png" alt="" />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
// import layout from '@/views/layout/layout.vue'
import { saveToken, getToken } from "../../utils/token";
import { userLogin } from "../../api/login";
import register from "./register.vue";
export default {
  name: "login",
  components: {
    register,
  },
  data() {
    return {
      codeUrl: "http://127.0.0.1/heimamm/public/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        isCheck: [],
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号!", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号格式有误!",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码!", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位密码",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码!", trigger: "blur" },
          {
            required: true,
            min: 4,
            max: 4,
            message: "请填入4位验证码!",
            trigger: "change",
          },
        ],
        isCheck: [
          { required: true, message: "请阅读并同意!", trigger: "change" },
        ],
      },
    };
  },
  created() {
    // 如果有token就跳转值layout,没有就算了
    window.console.log("获取token:", getToken("token"));
    if (getToken("token")) {
      this.$router.push("/layout");
    }
  },
  methods: {
    submit() {
      // window.console.log(this.form);
      this.$refs.ruleForm.validate((result) => {
        // window.console.log(result);
        if (result) {
          userLogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code,
          }).then((res) => {
            console.log(res);
            saveToken(res.data.token);
            this.$message.success("登陆成功");
            this.$router.push("/layout");
          });
        } else {
          this.$message.error("数据格式有误!");
          return false;
        }
      });
    },
    codeClick() {
      // 点击切换图形验证码   后面加上随机数防止浏览器缓存
      console.log(111);
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&t=" + Date.now();
    },
    registerClick() {
      this.$refs.register.dialogFormVisible = true;
    },
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
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