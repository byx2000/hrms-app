<!--
  用户信息
-->

<template>
  <el-row type="flex" align="middle">
    <el-avatar :size="40" :src="defaultAvatarUrl"></el-avatar>
    <p class="username">用户1</p>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      defaultAvatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style scoped>
.username {
  margin: 0;
  margin-left: 20px;
  font-weight: bold;
}
</style>