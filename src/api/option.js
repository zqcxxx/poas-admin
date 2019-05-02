import request from '@/utils/request'

export function getOptions(id) {
  return request({
    url: `/getoption/${id}`,
    method: 'get'
  })
}
