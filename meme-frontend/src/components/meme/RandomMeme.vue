
<template>
  <v-card max-width="600px" class="mx-auto" >
    <v-card-title>
      <v-toolbar flat>Random Meme:

      </v-toolbar>
    </v-card-title>

    


      <v-img class="img" :src="randomItem.picture" :aspect-ratio="4 / 4" contain></v-img>
      <v-card-title>{{ randomItem.name }}</v-card-title>
      <v-card-text>
        Source: {{ randomItem.source }}
        <br>
        Creator: {{ randomItem.creator }}
        <br>
        Category: {{ randomItem.category }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closecomp" >
          Cancel
        </v-btn>
        
      </v-card-actions>
   
  </v-card>
</template>
  
  
<script>

import Repository from "@/repository/RepositoryFactory.js";



export default {
  name: "RandomMeme",
  props: {
    componentKey: 0
  },
  data() {
    return {
      memes: [],
      randomItem: {
        name: '',
        picture: {},
        category: '',
        source: '',
        creator: '',
        // likes: 0,
      },
      defaultItem: {
        name: '',
        picture: {},
        category: '',
        source: '',
        creator: '',
        // likes: 0,
      },
      
    };
  },

  async created() {
    await this.loadMemes();
    this.setRandomMeme();
  },
  watch: {
    componentKey(){
      if (this.componentKey>0) {
        this.setRandomMeme()
      }
    }
  },
  methods: {
    async loadMemes() {
      const memesRepository = Repository.get("meme");
      const response = await memesRepository.all();
      this.memes = response.data
    },
    setRandomMeme() {
      const randomIndex = Math.floor(Math.random() * this.memes.length);
      this.randomItem = this.memes[randomIndex];
    },
    closecomp(){
      this.$emit('close')
    },
    
  },
};
</script>
  
<style scoped></style>