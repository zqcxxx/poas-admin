import request from '@/utils/request'

export function submitAnswer(data) {
  return request({
    url: `answer/submitanswer`,
    method: 'post',
    data
  })
}

export function getAnswer(id) {
  return request({
    url: `answer/getanswer/${id}`,
    method: 'get'
  })
}
