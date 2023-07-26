<template>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4" >
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-form @submit.prevent="login">
              <v-card-text>
                  <v-text-field v-model="username" label="Username" name="username" prepend-icon="mdi-account" type="text"></v-text-field>
                  <v-text-field v-model="password" label="Password" id="password" name="password" prepend-icon="mdi-lock-outline" type="password"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
  
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import Repository from "@/repository/RepositoryFactory";
  const auth = Repository.get('auth')
  
  export default {
    name: 'Login',
    data () {
      return {
        msg: "Login",
        username: "",
        password: "",
      }
    },
    methods: {
      async login(){
        try {
          await auth.login(this.username, this.password);
          const response = await auth.isAuthenticated()
          if (!response) throw "Login failed. Please try again.";
          this.$store.commit("authenticated", true);
          this.$store.commit("username", this.username);
          this.$router.push({ name: 'home' });
          this.$store.commit("snackColor", "success")
          this.$store.commit("snack", "Successful Login")
        } catch (error) {
          this.$store.commit("authenticated", false);
          this.$store.commit("snackColor", "error");
          this.$store.commit("snack", "Username or Password is wrong")
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>