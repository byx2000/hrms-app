/**
 * 与考勤相关的网络请求
 */

import request from './request'

// 获取考勤列表
export function getAttendanceList(query) {
  return request({
    url: '/attendance/list',
    method: 'post',
    data: query
  })
}