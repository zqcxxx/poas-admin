import request from '@/utils/request'

export function submitAnswer(data) {
  return request({
    url: `answer/submitanswer`,
    method: 'post',
    data
  })
}
