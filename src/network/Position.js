/**
 * 与职位相关的网络请求
 */

import request from './request'

// 根据部门获取所有职位选项
export function getAllPositionSelection(deptId) {
  return request({
    url: '/position/selection',
    method: 'post',
    data: { deptId }
  })
}