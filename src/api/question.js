import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getQuestions(params) {
  return request({
    url: '/questions',
    method: 'get',
    params
  })
}
