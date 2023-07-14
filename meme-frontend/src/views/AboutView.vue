<template>
  <div>
    <v-col>
    
  <h1>Hello dear user</h1>
  <br>
  <p>I made this website to enjoy memes😃 </p>
  <p>Go ahead and create some!</p>


  <br>
 
  
  <v-btn style="font-size: 24px;" @click="value = !value">Click for Meme</v-btn>



  <h1 v-if="value"></h1>
  <div v-else>
    <h1 ></h1>
	  <v-img  max-width="600px" src="@/assets/rickroll-roll.gif"></v-img>
  </div>
  


</v-col>
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
  .back{
    text-align: center;
  }
</style>