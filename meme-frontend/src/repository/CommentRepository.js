import Repository from './Repository'
const resource = 'comments'

export default{
  async all() {
    return await Repository.get(`${resource}/`)
  },
  async specific(comment_id) {
    return await Repository.get(`${resource}/${comment_id}/`)
  },
  
  
  async create(formdata) {
    return await Repository.post(`${resource}/`, formdata)
  },
  async delete(comment_id){
    return await Repository.delete(`${resource}/${comment_id}/`)
  },
  async put(comment_id, formdata){
    return await Repository.put(`${resource}/${comment_id}/`, formdata)
  },
  async like(comment_id, username){
    return await Repository.post(`${resource}/${comment_id}/like/`, {"username": username})
  },
  async dislike(comment_id, username){
    return await Repository.post(`${resource}/${comment_id}/dislike/`, {"username": username})
  }
}

//async put(meme_id, name, picture, category, source, owner, likes){
//  return await Repository.put(`${resource}/${meme_id}/`, {'name':name, 'picture':picture, 'category' :category,'source': source, 'owner':owner, 'likes':likes})
//}