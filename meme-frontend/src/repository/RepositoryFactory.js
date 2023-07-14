
import MemeRepository from "./MemeRepository"
import CategoryRepository from "./CategoryRepository"
import CommentRepository from "./CommentRepository"



const repositories = {
  'meme': MemeRepository,
  'category': CategoryRepository,
  'comment': CommentRepository,

}

export default {
  get: name => repositories[name]
}