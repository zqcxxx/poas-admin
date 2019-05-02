import request from '@/utils/request'

// eslint-disable-next-line space-before-function-paren
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// eslint-disable-next-line space-before-function-paren
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
  return request({
    url: '/question/addquestions',
    method: 'post',
    data: data
  })
}

export function deleteQuestion(id) {
  return request({
    url: `/question/delete/${id}`,
    method: 'get'
  })
}

export function getQuestionOptions(id) {
  return request({
    url: `/question/getoptions/${id}`,
    method: 'get'
  })
}

export function editQuestion(data) {
  return request({
    url: '/question/editquestions',
    method: 'post',
    data: data
  })
}
