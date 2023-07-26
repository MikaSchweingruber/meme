<template>
  <div>
    <v-row>
      <v-col v-for="(item) in memes" :key="item.id" cols="12" sm="6" md="4" lg="3">


        <v-card class="card" color="secondary">
          <v-img class="img" :src="item.picture" :aspect-ratio="4 / 4" contain></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            Source: {{ item.source }}
            <br>
            Creator: {{ item.creator }}
            <br>
            Category: {{ item.category }}
            <br>
            <v-row>
              <v-col>
                <v-icon class="icon" @click="like(item.id, 'smik1')" :color="item.likes.includes('smik1') ? 'primary': 'white'">mdi-thumb-up</v-icon>
                {{ item.likes.length  }}
                <v-icon class="icon" @click="dislike(item.id, 'smik1')" :color="item.dislikes.includes('smik1') ? 'primary': 'white'">mdi-thumb-down</v-icon>
                {{ item.dislikes.length  }}
                <v-icon class="icon" @click="comment(item)">mdi-chat</v-icon>
                {{ item.comments.length }}
                <v-icon class="icon" @click="deleteItem(item)">mdi-delete</v-icon>
                <v-icon class="icon" @click="editItem(item)">mdi-pencil</v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" width="auto">
        <ItemComponent :editedIndex="editedIndex" :editedItem="editedItem" @close="close" @save="save" />
      </v-dialog>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="900px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete {{ editedItem.name }}?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">Yes</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogcomment" max-width="900px">
      <CommentComponent :editedItem="editedItem" @close="closeComment" @getmemes="getAllMemes" @reload="reloadcomments"/>
    </v-dialog>

  </div>
</template>


<script>
import ItemComponent from "@/components/meme/ItemComponent"
import CommentComponent from "@/components/meme/CommentComponent.vue"
import Repository from "@/repository/RepositoryFactory.js";
// import MemeComponent from "./MemeComponent.vue";



const memes = Repository.get("meme")



export default {
  name: "Maincomponent",

  components: {
    ItemComponent,
    CommentComponent,
    // MemeComponent
  },
  data: () => ({
    memes: [],
    search: '',
    category: '',
    title: '',
    dialog: false,
    dialogDelete: false,
    dialogcomment: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      picture: {},
      category: '',
      source: '',
      creator: '',
      comments: {},
    },
    defaultItem: {
      name: '',
      picture: [],
      category: '',
      source: '',
      creator: '',
      comments: "",
    },
    tab: null,
  }),
  created() {
    if (this.$route.path == "/") {
      this.getAllMemes()
    } else {
      this.getAllCategoryMemes(this.$route.path.substring(7))
    }
    this.$store.watch(state => state.memesreload, () => {
      if (this.$store.getters.memesreload){
        this.updateMemes()
      }
    })
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        // Lade die Komponente neu
        if (this.$route.path == "/") {
          this.getAllMemes()
        } else {
          this.getAllCategoryMemes(this.$route.path.substring(7))
        }
      }
    }
  },
  mounted() {


  },

  methods: {
    updateMemes() {
      this.getAllMemes().then(result => this.$store.commit("memesreload", false))
    },
    async getAllMemes() {
      let response = await memes.all()
      this.memes = response.data
      console.log(this.memes)
    },
    async getAllCategoryMemes(category) {
      let response = await memes.category(category)
      this.memes = response.data
    },
    shouldShow(item) {
      return item.category === this.category;
    },
    async editItem(item) {
      this.editedIndex = this.memes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const resp = await fetch(this.editedItem.picture)
      const blob = await resp.blob()
      const file = new File([blob], resp.url.split("/")[5])
      this.editedItem.picture = file
      this.dialog = true
    },
    async save(item) {
      if (this.editedIndex > -1) {
        Object.assign(this.memes[this.editedIndex], this.editedItem)

        const formData = new FormData();
        formData.append('name', this.editedItem.name)
        formData.append('picture', this.editedItem.picture)
        formData.append('category', this.editedItem.category)
        formData.append('source', this.editedItem.source)
        formData.append('creator', this.editedItem.creator)
        // formData.append('likes', this.editedItem.likes)
        await memes.put(this.editedItem.id, formData)
      } else {
        console.log(await item.picture)
        console.log(await item.likes)
        const formData = new FormData();
        formData.append('name', item.name)
        formData.append('picture', item.picture)
        formData.append('category', item.category)
        formData.append('source', item.source)
        formData.append('creator', item.creator)
        // formData.append('likes', item.likes)
        await this.createMeme(formData)
      }
      await this.getAllMemes()
      this.close()
    },
    async createMeme(meme) {
      await memes.create(meme)
    },
    // Delete Item
    deleteItem(item) {
      this.editedIndex = this.memes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      console.log(this.editedItem)
      await memes.delete(this.editedItem.id)
      await this.getAllMemes()
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
    },
    close() {
      this.dialog = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    async like(meme_id, username){
      await memes.like(meme_id, username)
      await this.getAllMemes()
    },
    async dislike(meme_id, username){
      await memes.dislike(meme_id, username)
      await this.getAllMemes()
    },
    async comment(item){
      this.editedItem = Object.assign({}, item)
      this.dialogcomment=true
    },
     closeComment(){
      this.dialogcomment=false
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    // reloadcomments(){
    //   this.
    // }
  },
  computed: {

  }
}
</script>

<style scoped>
.icon {
  padding-left: 10px;
}
</style>