<template>
  <el-table :data="salaries" border style="width: 100%">
    <el-table-column prop="empNo" label="员工工号" width="180"/>
    <el-table-column prop="empName" label="员工姓名" width="180"/>
    <el-table-column prop="deptName" label="部门" width="180"/>
    <el-table-column label="薪资" width="180">
      <template slot-scope="scope">
        ￥{{scope.row.salary}}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" width="180"/>
    <el-table-column label="操作">
        <template>
          <el-button type="primary" size="mini">详情</el-button>
          <el-button size="mini" type="warning">调整薪资</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    salaries: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>