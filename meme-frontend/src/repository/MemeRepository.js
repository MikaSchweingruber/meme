import Repository from './Repository'
const resource = 'memes'

export default{
  async all() {
    return await Repository.get(`${resource}/`)
  },
  async specific(meme_id) {
    return await Repository.get(`${resource}/${meme_id}/`)
  },
  async category(category_name) {
    return await Repository.get(`${resource}/?category=${category_name}`)
  },
  async create(formdata) {
    return await Repository.post(`${resource}/`, formdata)
  },
  async delete(meme_id){
    return await Repository.delete(`${resource}/${meme_id}/`)
  },
  async put(meme_id, formdata){
    return await Repository.put(`${resource}/${meme_id}/`, formdata)
  },
  async like(meme_id, username){
    return await Repository.post(`${resource}/${meme_id}/like/`, {"username": username})
  },
  async dislike(meme_id, username){
    return await Repository.post(`${resource}/${meme_id}/dislike/`, {"username": username})
  }
}

//async put(meme_id, name, picture, category, source, owner, likes){
//  return await Repository.put(`${resource}/${meme_id}/`, {'name':name, 'picture':picture, 'category' :category,'source': source, 'owner':owner, 'likes':likes})
//}