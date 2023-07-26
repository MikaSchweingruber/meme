import Repository from './Repository'
const resource = 'users'

export default{
  allUser() {
    return Repository.get(`${resource}/`)
  },
  specificUser(username) {
    return Repository.get(`${resource}/${username}`)
  }
}