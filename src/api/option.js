import request from '@/utils/request'

export function getOptions(id) {
  return request({
    url: `option/getoption/${id}`,
    method: 'get'
  })
}

export function delOption(id) {
  return request({
    url: `/option/deloption/${id}`,
    method: 'get'
  })
}
