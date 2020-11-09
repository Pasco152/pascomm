<template>
   <!-- 挂载的元素 -->
    <div id="app">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="input1">
        </el-input>
        <el-input show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2">
        </el-input>
        <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input3">
        </el-input>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>