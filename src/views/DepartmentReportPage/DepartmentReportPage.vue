<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="employee-count-chart-bar"></div>
      </el-col>
      <el-col :span="12">
        <div id="employee-count-chart-pie"></div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    BarChart, PieChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent 
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [ TitleComponent, TooltipComponent, GridComponent, BarChart, PieChart, CanvasRenderer, LegendComponent ]
)

import {
  getDepartmentEmployeeCountReport
} from '../../network/DepartmentReport.js'

export default {
  data() {
    return {
      employeeCountReportData: []
    }
  },
  computed: {
    labels() {
      return this.employeeCountReportData.map(e => e.deptName)
    },
    values() {
      return this.employeeCountReportData.map(e => e.empCount)
    },
    pieData() {
      return this.employeeCountReportData.map(e => {return {name: e.deptName, value: e.empCount}})
    }
  },
  created() {
    getDepartmentEmployeeCountReport().then(res => {
      this.employeeCountReportData = res.data
      this.drawEmployeeCountChartBar()
      this.drawEmployeeCountChartPie()
    })
  },
  methods: {
    drawEmployeeCountChartBar() {
      if (this.employeeCountChartBar !== null && this.employeeCountChartBar !== undefined && this.employeeCountChartBar !== '') {
        this.employeeCountChartBar.dispose()
      }
      this.employeeCountChartBar = echarts.init(document.getElementById('employee-count-chart-bar'))
      this.employeeCountChartBar.setOption({
        title: {
          text: '部门人数统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          position: 'top'
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: this.labels
        },
        series: [
          {
            name: '人数',
            type: 'bar',
            label: {
              show: true,
              position: 'insideTopRight'
            },
            data: this.values
          }
        ]
      })
    },
    drawEmployeeCountChartPie() {
      if (this.employeeCountChartPie !== null && this.employeeCountChartPie !== undefined && this.employeeCountChartPie !== '') {
        this.employeeCountChartPie.dispose()
      }
      this.employeeCountChartPie = echarts.init(document.getElementById('employee-count-chart-pie'))  
      this.employeeCountChartPie.setOption({
        title: {
          text: '部门人数分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}    {c}人    ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 'top',
          top: 37,
          padding: 0
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '75%',
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]        
      })    
    }
  }
}
</script>

<style scoped>
#employee-count-chart-bar {
  width: 100%;
  height: 700px;
}

#employee-count-chart-pie {
  width: 100%;
  height: 700px;
}
</style>