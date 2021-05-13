<!--
  考勤管理
-->

<template>
  <div>
    <attendance-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <page-switch 
        class="page-switch" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <attendance-list 
      :list="pageInfo.list"
      @onDetailClick="onDetailClick"/>
    <el-row type="flex" justify="center">
      <page-switch 
        class="page-switch-bottom" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
  </div>
</template>

<script>
import { getAttendanceList } from '../../network/Attendance.js'
import AttendanceQueryOption from './components/AttendanceQueryOption'
import AttendanceList from './components/AttendanceList'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'

export default {
  components: { AttendanceQueryOption, AttendanceList, PageInfo, PageSwitch },
  data() {
    return {
      query: {
        date: '2021-05-12',
        empNo: '',
        empName: '',
        type: 0,
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {}
    }
  },
  created() {
    this.refreshAttendanceData(this.query)
  },
  methods: {
    refreshAttendanceData(query) {
      getAttendanceList(query).then(res => {
        this.pageInfo = res.data
      })
    },
    onSearchClick(query) {
      query.pageSize = this.query.pageSize
      query.currentPage = 1
      this.query = query
      this.refreshAttendanceData(this.query)
    },
    onCurrentPageChange(currentPage) {
      this.query.currentPage = currentPage
      this.refreshAttendanceData(this.query)
    },
    onPageSizeChange(pageSize) {
      this.query.pageSize = pageSize
      this.query.currentPage = 1
      this.refreshAttendanceData(this.query)
    },
    onDetailClick(empId) {
      console.log(empId)
    }
  }
}
</script>

<style scoped>
.page {
  margin-bottom: 20px;
}

.page-switch-bottom {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>