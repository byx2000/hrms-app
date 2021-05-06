/**
 * 与部门相关的网络请求
 */

import request from './request'

// 获取所有部门选项
export function getAllDepartmentSelection() {
  return request({
    url: '/department/selection',
    method: 'post'
  })
}