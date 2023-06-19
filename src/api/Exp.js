import request from '../util/request.js'

export function getExpRec() {
    return request({
      url: '/experiment/getlist',
      method: 'get',
    })
}

export function updateExpRec(fileinfo) {
    const data=fileinfo
    return request({
      url: '/experiment/update',
      method: 'post',
      data: data
    })
}

export function removeExpRec(fileinfo) {
    const data=fileinfo
    return request({
      url: '/experiment/delete',
      method: 'delete',
      data: data
    })
}