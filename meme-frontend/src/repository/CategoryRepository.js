import Repository from './Repository'
const resource = 'categories'

export default{
  async all() {
    return await Repository.get(`${resource}/`)
  },
  async specific(name) {
    return await Repository.get(`${resource}/${name}/`)
  },
  async create(formdata) {
    return await Repository.post(`${resource}/`, formdata)
  },
  async delete(name){
    return await Repository.delete(`${resource}/${name}/`)
  },
  async put(name, formdata){
    return await Repository.put(`${resource}/${name}/`, formdata)
  }
}

