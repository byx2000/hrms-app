<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!--员工年龄分布-->
        <div id="age-chart-bar"></div>
      </el-col>
      <el-col :span="12">
        <!--员工年龄分布-->
        <div id="age-chart-pie"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <!--员工性别分布-->
        <div id="gender-chart-pie"></div>
      </el-col>
      <el-col :span="12">
        <!--员工类型分布-->
        <div id="type-chart-pie"></div>
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
  getAgeReport, getGenderReport 
} from '../../network/EmployeeReport.js'

export default {
  data() {
    return {
      ageReportData: {},
      genderReportData: {}
    }
  },
  computed: {
    pieAgeData() {
      let data = []
      for (let i = 0; i < this.ageReportData.labels.length; ++i) {
        data.push({
          name: this.ageReportData.labels[i],
          value: this.ageReportData.values[i]
        })
      }
      return data
    }
  },
  created() {
    getAgeReport().then(res => {
      this.ageReportData = res.data

      this.$nextTick(() => {
        this.drawAgeChartBar()
        this.drawAgeChartPie()
        //this.drawGenderChartPie()
        //this.drawTypeChartPie()
      })
    })

    getGenderReport().then(res => {
      this.genderReportData = res.data
      this.drawGenderChartPie()
    })
  },
  methods: {
    drawAgeChartBar() {
      if (this.ageChartBar !== null && this.ageChartBar !== undefined && this.ageChartBar !== '') {
        this.ageChartBar.dispose()
      }
      this.ageChartBar = echarts.init(document.getElementById('age-chart-bar'))
      this.ageChartBar.setOption({
        title: {
          text: '员工年龄人数统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          name: '年龄',
          type: 'category',
          data: this.ageReportData.labels
        },
        yAxis: {
          name: '人数',
          type: 'value'
        },
        series: [{
          data: this.ageReportData.values,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    drawAgeChartPie() {
      if (this.ageChartPie !== null && this.ageChartPie !== undefined && this.ageChartPie !== '') {
        this.ageChartPie.dispose()
      }
      this.ageChartPie = echarts.init(document.getElementById('age-chart-pie'))
      this.ageChartPie.setOption({
        title: {
          text: '员工年龄分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{c}: ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            data: this.pieAgeData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label : {
              formatter: '{b}({d}%)'
            }
          }
        ]
      })
    },
    drawGenderChartPie() {
      if (this.genderChartPie !== null && this.genderChartPie !== undefined && this.genderChartPie !== '') {
        this.genderChartPie.dispose()
      }
      this.genderChartPie = echarts.init(document.getElementById('gender-chart-pie'))
      this.genderChartPie.setOption({
        title: {
          text: '员工性别分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            data: [
              {value: this.genderReportData.maleCount, name: '男', itemStyle: {color: '#5080e2'}},
              {value: this.genderReportData.femaleCount, name: '女', itemStyle: {color: '#f15151'}},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label : {
              formatter: '{b}({d}%)',
              position: 'inner'
            }
          }
        ]
      })      
    },
    drawTypeChartPie() {
      if (this.typeChartPie !== null && this.typeChartPie !== undefined && this.typeChartPie !== '') {
        this.typeChartPie.dispose()
      }
      this.typeChartPie = echarts.init(document.getElementById('type-chart-pie'))
      this.typeChartPie.setOption({
        title: {
          text: '员工类型分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '80%',
            data: [
              {value: 2900, name: '实习生'},
              {value: 2500, name: '正式员工'},
            ],
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
#age-chart-bar {
  width: 100%;
  height: 400px;
}

#age-chart-pie {
  width: 100%;
  height: 400px;
}

#gender-chart-pie {
  width: 100%;
  height: 400px;
}

#type-chart-pie {
  width: 100%;
  height: 400px;
}
</style>