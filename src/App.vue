<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    let _url = process.env.VUE_APP_URL
    alert(_url);
  },
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>