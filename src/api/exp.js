import request from '../util/request.js'

export function getParticipant(expId) {
    const data = {
        expId: expId
    };
    return request({
        url: '/experiment/getParticipant',
        method: 'get',
        params: data
    });
}
// 获取用户信息
export function getInfo() {
    return request({
        url: '/admin-api/user/profile/get',
        method: 'get'
    })
}
