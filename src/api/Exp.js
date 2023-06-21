import request from '../util/request.js'

export function getExpRec() {
    return request({
      url: '/experiment/getlist',
      method: 'get',
    })
}
export function getParticipantByExpId(expId) {
  const data={
    expId: expId
  }
  return request({
    url: '/experiment/getParticipant',
    method: 'get',
    params:data
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

export function getExpRecById(userid) {
  return request({
    url: '/experiment/delete',
    method: 'delete',
    params: userid
  })
}

//删除实验
export function deleteExperiment(expId) {
    return request({
        url: `/experiment/delete?expId=${expId}`,
        method: 'post'
    });
}

//查看被试名单
export function getParticipant(expId) {
    return request({
        url:`/experiment/getParticipant?expId=${expId}`,
        method: 'get'
    })
}

//删除被试者
export function deleteParticipant(expId, username) {
    return request({
        url:`/experiment/deleteParticipant?expId=${expId}&username=${username}`,
        method: 'post'
    })
}

