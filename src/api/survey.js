import request from '@/utils/request'

export function createSurvey(data) {
  return request({
    url: '/survey/addsurvey',
    method: 'post',
    data: data
  })
}

export function getSurveys(pg, num) {
  return request({
    url: `/survey/getsurveys/${pg}/${num}`,
    method: 'get'
  })
}

export function getSurveyCount() {
  return request({
    url: '/survey/getsurveycount',
    method: 'get'
  })
}

export function publishSurvey(id, value) {
  return request({
    url: `/survey/publishsurvey/${id}/${value}`,
    method: 'get'
  })
}

export function delSurvey(id) {
  return request({
    url: `/survey/delsurvey/${id}`,
    method: 'get'
  })
}

export function getSurvey(id) {
  return request({
    url: `/survey/getcompletesurvey/${id}`,
    method: 'get'
  })
}
