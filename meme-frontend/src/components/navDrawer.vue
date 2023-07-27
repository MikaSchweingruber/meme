<template>
  <v-list nav dense>
    <template v-for="item in items"> 
      <v-list-item v-if="typeof item.link == 'string'" :key="item.title" :to="item.link" color="primary">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-group v-else :prepend-icon="item.icon" :key="item.title" no-action color="white" v-model="item.expand">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="item in item.link" :key="item.title" :to="item.link" color="white">
  <!--                <v-list-item-action>-->
  <!--                  <v-icon>{{ item.icon }}</v-icon>-->
  <!--                </v-list-item-action>-->
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
    export default {
      name: "navDrawer",
      data() {
        return {
          items: [
            {title: 'Home', icon: 'mdi-home', link: '/'},
            {title: 'Categories', icon: 'mdi-emoticon-poop', expand: false, link: [
                {title: 'classics', link: '/memes/classics'},
                {title: 'Coop',  link: '/memes/coop'},
                {title: 'Gspässli', link: '/memes/Gspässli'},
                {title: 'other', link: '/memes/other'},
                {title: 'videos - coming soon!', link: '/comingsoon'},
                // {title: '', link: ''},
              ]
            },
           
            {title: 'about', icon: 'mdi-rocket', link: '/about', group: false},
          ]
        }
      },
      created() {
        this.adaptSidebar(this.$router.currentRoute.path)
      },
      methods: {
        adaptSidebar(path) {
          for (const item of this.items){
            if (typeof item.link != 'string') {
              item.expand = path.includes(item.title.toLowerCase())
            }
          }
        },

      }
    }
</script>

<style scoped>

</style>
