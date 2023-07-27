<template>
  <v-app>
    <v-snackbar v-model="snackbar" :color="color" :top="true">
      {{ message }}

      <v-btn dark text @click="removeSnack()">
        Close
      </v-btn>

    </v-snackbar>
    <v-container v-if=user>
      <v-navigation-drawer v-model="drawer" app clipped>
        <nav-drawer></nav-drawer>
      </v-navigation-drawer>
      <v-app-bar app clipped-left color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="d-flex align-center">


          <v-img alt="Vuetify Name" contain src="@/assets/PngItem_966303.png" max-width="60" />
        </div>

        <v-spacer></v-spacer>

        <v-btn color="secondary" dark class="mb-2" @click="dialog = true">
          New Item
        </v-btn>
        <v-btn @click="openDialog()" target="_blank" text>
          <span class="mr-2">random meme</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-responsive>
                <v-avatar color="primary" size="40">
                  <span class="white--text headline"> {{ $store.getters.username[0].toUpperCase() }}</span>
                </v-avatar>
              </v-responsive>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar color="primary">
                  <span class="white--text headline"> {{ $store.getters.username[0].toUpperCase() }}</span>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ $store.getters.firstName }} {{ $store.getters.lastName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $store.getters.username }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="logout()">Logout</v-btn>
              <!-- <v-btn text @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" text @click="menu = false">Save</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-menu>

      </v-app-bar>

      <v-dialog max-width="400px" v-model="dialogRandom" persistent>
        <RandomMeme :componentKey="componentKey" @close="close" @click="$emit('setRandomMeme')" />
      </v-dialog>

      <v-dialog max-width="600px" v-model="dialog">
        <ItemComponent :editedIndex="editedIndex" :editedItem="editedItem" @close="close" @save="save" />
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
    <v-container v-else fill-height fluid>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <span>&copy; {{ year }}</span>
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
const auth = Repository.get('auth')

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
    year: new Date().getFullYear(),
    editedIndex: -1,
    color: '',
      snackbar: false,
      timeout: 6000,
      message: '',
      timoutId: null,
      menu: false,
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
  computed: {
    user(state) {
      try {
        return this.$store.state.authenticated
      } catch (e) {
        return false
      }
    }
  },
  created() {
    this.$store.watch(state => state.snack, () => {
      if (this.$store.getters.snack.length > 0 && !this.snackbar) {
        this.nextSnack()
      }
    })
    //document.title = process.env.TITLE // site title is being defined here
  },

  methods: {

    nextSnack() {
      this.snackbar = true
      this.message = this.$store.getters.snack[0]
      this.color = this.$store.getters.snackColor[0]
      this.timeoutId = setTimeout(() => { this.removeSnack() }, this.timeout)
    },
    removeSnack() {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
      this.$store.commit("removeSnack")
      this.$store.commit("removeSnackColor")
      if (this.$store.getters.snack.length > 0) {
        this.nextSnack()
      } else {
        this.snackbar = false
      }

    },
    async logout() {
      try {
        const response = await auth.logout()
        this.$store.commit("authenticated", false)
        this.$store.commit("snackColor", "success")
        this.$store.commit("snack", `Logout was succesfull`)
        this.$router.push({ name: "auth" })
      } catch (e) {
        this.$store.commit("snackColor", "error")
        this.$store.commit("snack", `Logout failed`)
      }
    },

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
    destroyed() {
      if (this.timeoutId !== null) {
        this.removeSnack()
      }
    }
  }
};
</script>
