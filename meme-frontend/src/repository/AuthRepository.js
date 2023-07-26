import Repository from './Repository'

export default {
  async isAuthenticated() {
    try {
      return [true, await Repository.get(`test-auth/`)]
    } catch (error) {
      return false
    }
  },
  async login(username, password){
    const response = await Repository.post(`login/`, {username, password})
    const authValid = await this.isAuthenticated()
    if (!authValid) {
      return null
    }
    return response.data
  },
  async logout() {
    const response = await Repository.post(`logout/`)
    return response.data
  }
}