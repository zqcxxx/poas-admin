import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getQuestions(pg, num) {
  return request({
    url: `/question/getquestions/${pg}/${num}`,
    method: 'get'
  })
}

export function getQuestionCount() {
  return request({
    url: '/question/getquestioncount',
    method: 'get'
  })
}

export function addQuestion(data) {
  console.log(typeof data)
  return request({
    url: '/question/addquestions',
    method: 'post',
    data: data
  })
}
