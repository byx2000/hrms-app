<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="empNo" label="员工工号" width="180"/>
    <el-table-column prop="empName" label="员工姓名" width="180"/>
    <el-table-column prop="date" label="日期" width="180"/>
    <el-table-column label="类型" width="180">
      <template slot-scope="scope">
        {{scope.row.type == 0 ? '出勤' : '退勤'}}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" width="180"/>
    <el-table-column label="状态" width="180">
      <template slot-scope="scope">
        <span :class="getStateClass(scope.row.type, scope.row.time)">
          {{getState(scope.row.type, scope.row.time)}}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="onDetailClick(scope.row.empId)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getState(type, time) {
      if (type === 0) {
        return time > '09:00' ? '迟到' : '正常出勤'
      } else {
        return time < '17:00' ? '早退' : '正常退勤'
      }
    },
    getStateClass(type, time) {
      if (type === 0) {
        return time > '09:00' ? 'red' : 'green'
      } else {
        return time < '17:00' ? 'red' : 'green'
      }
    },
    onDetailClick(empId) {
      this.$emit('onDetailClick', empId)
    }
  }
}
</script>

<style scoped>
.green {
  color: #23c284;
}

.red {
  color: red;
}
</style>