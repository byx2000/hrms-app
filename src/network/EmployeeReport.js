/**
 * 与员工报表相关的网络请求
 */

import request from './request'

// 获取年龄报表
export function getAgeReport() {
  return request({
    url: '/report/employee/age',
    method: 'post'
  })
}

// 获取性别报表
export function getGenderReport() {
  return request({
    url: '/report/employee/gender',
    method: 'post'
  })
}

// 获取类型报表
export function getTypeReport() {
  return request({
    url: '/report/employee/type',
    method: 'post'
  })
}