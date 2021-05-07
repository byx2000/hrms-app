/**
 * 与薪资相关的网络请求
 */

import request from './request'

// 获取薪资列表
export function getSalaryList(query) {
  return request({
    url: '/salary/list',
    method: 'post',
    data: query
  })
}