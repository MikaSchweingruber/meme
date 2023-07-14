<template>
  <v-app>
    <v-container>
      <v-navigation-drawer v-model="drawer" app clipped>
        <nav-drawer></nav-drawer>
      </v-navigation-drawer>
      <v-app-bar app clipped-left  color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="d-flex align-center">


          <v-img alt="Vuetify Name" contain src="@/assets/PngItem_966303.png" max-width="60" />
        </div>

        <v-spacer></v-spacer>

        <v-btn color="secondary" dark class="mb-2" @click="dialog=true">
              New Item
            </v-btn>
        <v-btn @click="openDialog()" target="_blank" text>
          <span class="mr-2">random meme</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>

      <v-dialog max-width="400px" v-model="dialogRandom" persistent >
        <RandomMeme :componentKey="componentKey" @close="close" @click="$emit('setRandomMeme')" />
      </v-dialog>

      <v-dialog max-width="600px" v-model="dialog" >
        <ItemComponent  :editedIndex="editedIndex" :editedItem="editedItem" @close="close" @save="save" />
      </v-dialog>

      <v-main>
        <router-view />
      </v-main>

      <v-footer app padless>
        <v-col class="text-center" cols="12">
          Entwickelt von: 1748 — {{ new Date().getFullYear() }} Mika Schweingruber
        </v-col>
      </v-footer>
  </v-container>
  </v-app>
</template>

<script>
import RandomMeme from '@/components/meme/RandomMeme.vue'
import navDrawer from './components/navDrawer.vue';
import ItemComponent from './components/meme/ItemComponent.vue';
import MainComponent from './components/meme/MainComponent.vue'
import Repository from "@/repository/RepositoryFactory.js";

const memes = Repository.get("meme")

export default {
  name: 'App',

  components: {
    RandomMeme,
    navDrawer,
    ItemComponent,
    MainComponent,
  },
  data: () => ({
    dialogRandom: false,
    drawer: true,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      picture: [],
      category: '',
      source: '',
      creator: '',
      // likes: 0,
    },
    defaultItem: {
      name: '',
      picture: [],
      category: '',
      source: '',
      creator: '',
      // likes: 0,
    },
    componentKey: -1

  }),
  methods: {
    openDialog() {
      this.componentKey += 1
      this.dialogRandom = true
    }, 
    async save(item) {
      
      console.log(await item.picture)
      const formData = new FormData();
      formData.append('name', item.name)
      formData.append('picture', item.picture)
      formData.append('category', item.category)
      formData.append('source', item.source)
      formData.append('creator', item.creator)
      // formData.append('likes', item.likes)
      await this.createMeme(formData)
      this.$store.commit("memesreload", true)
      this.close()
      
    },
    async createMeme(meme) {
      await memes.create(meme)

      
    },
    close() {
      this.dialog = false
      this.dialogRandom = false
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
  
  }
};
</script>
