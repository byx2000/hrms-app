/**
 * 与部门报表相关的网络请求
 */

import request from './request'

// 获取部门员工人数报表
export function getDepartmentEmployeeCountReport() {
  return request({
    url: '/report/department/employee-count',
    method: 'post'
  })
}