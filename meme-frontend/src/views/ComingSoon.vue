<template>
  <div class="test">
    <v-col>
    
  <h1>Hello dear user</h1>
  <br>
  <p>Videos are coming soon😃 </p>
  <p>In Baselland we say: Mir wei luege.</p>
</v-col>
  <v-col >
  <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</v-col>
  <br>
  
  <br>
  <v-btn style="font-size: 24px;" @click="value = !value">Click for Meme</v-btn>



  <h1 v-if="value"></h1>
  <div v-else class="test">
   
    <br>
	  <v-img  max-width="600px" src="@/assets/rickroll-roll.gif"></v-img>
  </div>
  



  </div>
</template>

<script>
export default {
  data() {
  	return {
	    value: true
  	}
	}
}
</script>
<style>
  .test{
    text-align: center;
  }
</style>