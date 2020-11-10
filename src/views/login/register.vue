<template>
  <el-dialog
    title="注册"
    :visible.sync="dialogFormVisible"
    class="register"
    :show-close="false"
    width="600px"
  >
    <h1 slot="title" class="dialogTitle">用户注册</h1>
    <el-form ref="form" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + '/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.avatar"
            :src="baseUrl + '/' + form.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="code_img" alt :src="codeUrl" @click="codeClick" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button class="full_btn" @click="getRcode" :disabled="timeout>0 && timeout<60">
              获取验证码
              <span v-if="timeout>0 && timeout<60">{{timeout}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import {userRegister} from '../../api/register'
export default {
  data() {
    return {
      dialogFormVisible: false,
      // 表单数据
      form: {
        // 头像地址
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
      },
      codeUrl: "http://127.0.0.1/heimamm/public/captcha?type=sendsms&t=",
      timeout:60,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱");
              }
            },
            trigger: "change",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            },
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
          {
            min: 6,
            max: 12,
            message: "密码必须在6到12之间",
            trigger: "change",
          },
        ],
        code: [{ required: true, message: "请输入验证码!", trigger: "change" }],
        rcode: [
          { required: true, message: "请输入手机验证码!", trigger: "change" },
        ],
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "",
    };
  },
  methods: {
    // 上传前处理
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 它return的值就是控制让不让你通过  true通过  false不通过
      // return false
      return isJPG && isLt2M;
    },
    // 上传成功处理
    handleAvatarSuccess(res) {
      window.console.log(res);
      this.form.avatar = res.data.file_path;
      // 上传成功后由于该组件内部没有执行它的表单验证,所以我们要人为触发
      // 父传子(父调用字方法)1: 在子组件标签定义ref
      // this.imageUrl = res.data.file_path
      this.$refs.form.validateField(["avatar"]);
    },
    codeClick() {
      // 点击切换图形验证码   后面加上随机数防止浏览器缓存
      this.codeUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getRcode() {
      let _num = 0;
      this.$refs.form.validateField(["phone", "code"], (error) => {
        window.console.log(error);
        if (error == "") {
          _num++;
        }
      });
      if (_num == 2) {
        // 定时器
        this.timeout--;
        let interTime = setInterval(()=>{
          this.timeout--;
          if (this.timeout==0) {
            this.timeout = 60;
            clearInterval(interTime);
          }
        },1000)
        // this.$message.success("验证通过");
        userRegister({
          code:this.form.code,
          phone:this.form.phone,
        }).then(res=>{
          this.$message.success(res.data.data.captcha + '')
          window.console.log(res);
        }).catch(error=>{
          window.console.log(error);
        })
      } else {
        this.$message.error("验证失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .code_img {
    height: 40px;
  }
}
</style>