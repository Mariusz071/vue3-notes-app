import 'vuetify/styles'
import { createApp } from 'vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'fa'
  },
  theme: {
    themes: {
      light: {
        dark: true,
        colors: {
          primary: '#FB8C00',
          secondary: '#212121',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          disabled: '#BBBBBB',
          lightbg: '#f2f2f2',
          darkbg: '#f4f5f7'
        }
      }
    }
  }
})

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
