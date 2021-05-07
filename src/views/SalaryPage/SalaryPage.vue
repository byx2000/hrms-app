<!--
  薪资管理页
-->

<template>
  <div>
    <salary-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <page-switch 
        class="page-switch" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <salary-list :salaries="pageInfo.list"/>
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
import { getSalaryList } from '../../network/Salary.js'
import SalaryQueryOption from './components/SalaryQueryOption'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'
import SalaryList from './components/SalaryList'

export default {
  components: { SalaryQueryOption, PageInfo, PageSwitch, SalaryList },
  data() {
    let now = new Date()
    let year = now.getFullYear().toString()
    let month = (now.getMonth() + 1).toString().padStart(2, '0')
    let date = now.getDate().toString().padStart(2, '0')

    return {
      query: {
        time: year + "-" + month + "-" + date,
        empNo: '',
        empName: '',
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {}
    }
  },
  created() {
    this.refreshSalaryData(this.query)
  },
  methods: {
    refreshSalaryData(query) {
      getSalaryList(query).then(res => {
        this.pageInfo = res.data
      })
    },
    onSearchClick(query) {
      query.pageSize = this.query.pageSize
      query.currentPage = this.query.currentPage
      this.query = query
      this.refreshSalaryData(this.query)
    },
    onCurrentPageChange(currentPage) {
      this.query.currentPage = currentPage
      this.refreshSalaryData(this.query)
    },
    onPageSizeChange(pageSize) {
      this.query.pageSize = pageSize
      this.query.currentPage = 1
      this.refreshSalaryData(this.query)
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