
import MemeRepository from "./MemeRepository"
import CategoryRepository from "./CategoryRepository"
import CommentRepository from "./CommentRepository"
import AuthRepository from "./AuthRepository"
import UserRepository from "./UserRepository"



const repositories = {
  'meme': MemeRepository,
  'category': CategoryRepository,
  'comment': CommentRepository,
  'auth' : AuthRepository,
  'user' : UserRepository,

}

export default {
  get: name => repositories[name]
}