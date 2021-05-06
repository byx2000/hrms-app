<!--
  侧边栏导航
-->

<template>
  <el-menu :default-active="$route.path" router>
    <el-menu-item index="/employee">
      <i class="fa fa-address-card" aria-hidden="true"></i>
      <span slot="title">员工管理</span>
    </el-menu-item>
    <el-menu-item index="/department">
      <i class="fa fa-users" aria-hidden="true"></i>
      <span slot="title">部门管理</span>
    </el-menu-item>
    <el-menu-item index="/position">
      <i class="fa fa-desktop" aria-hidden="true"></i>
      <span slot="title">职位管理</span>
    </el-menu-item>
    <el-menu-item index="/salary">
      <i class="fa fa-credit-card" aria-hidden="true"></i>
      <span slot="title">薪资管理</span>
    </el-menu-item>
    <el-menu-item index="/attendance">
      <i class="fa fa-calendar" aria-hidden="true"></i>
      <span slot="title">考勤管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.fa {
  margin-right: 10px;
}
</style>