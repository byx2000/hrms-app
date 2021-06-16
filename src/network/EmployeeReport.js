/**
 * 与员工报表相关的网络请求
 */

import request from './request'

export function getAgeReport() {
  return request({
    url: '/report/employee/age',
    method: 'post'
  })
}