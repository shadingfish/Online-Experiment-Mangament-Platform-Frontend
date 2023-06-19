
const AccessTokenKey = 'ACCESS_TOKEN'
const PyPath = 'PYPATH'
const ExPath = 'EXPATH'

// ========== Token 相关 ==========

export function getAccessToken() {
  return localStorage.getItem(AccessTokenKey)
}


export function setToken(token,username) {
  localStorage.setItem(AccessTokenKey, token)
  localStorage.setItem(PyPath,username+'/'+'PyPath')
  localStorage.setItem(ExPath,username+'/'+'ExPath')
}

export function removeToken() {
  localStorage.removeItem(AccessTokenKey)
  localStorage.removeItem(PyPath)
  localStorage.removeItem(ExPath)
}

// ========== 路径 相关 ==========

export function getPyPath() {
  return localStorage.getItem(PyPath)
}

export function getExPath() {
  return localStorage.getItem(ExPath)
}