import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const opts = {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken4,
          // text: colors.white,
          // secondary: '#424242',
          // accent: '#82B1FF',
          // error: '#FF5252',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FFC107',
        },
        light: {
          //primary: colors.red.darken1,
          // text: colors.grey.darken3,
          // secondary: '#424242',
          // accent: '#82B1FF',
          // error: '#FF5252',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FFC107',
        }
      },
    },
  }

export default new Vuetify(opts)
