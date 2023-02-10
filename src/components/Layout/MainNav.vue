<template lang="pug">
v-navigation-drawer(
  v-model="isOpen"
  v-bind="{ location }"
  app
  dark
)
  v-list.pt-0
    v-list-item(
      v-for="item in navItems"
      :key="item.path"
      :active="item.isActive"
      :to="item.path"
      link
    )
      v-icon.mr-2 {{ item.icon }}
      | {{ item.label }}
    template(v-if="!!storeAuth.user")
      v-divider.mt-4
      v-list-item(
        @click="onLogout"
      ) 
        v-icon.mr-2 fa-solid fa-arrow-right-from-bracket
        | Logout
    
</template>

<script setup>
// imports
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/useAuthStore'

// navigation
const isOpen = ref(false)
const route = useRoute()
const { xs } = useDisplay()
const location = computed(() => (xs.value ? 'bottom' : 'start'))

// store
const storeAuth = useAuthStore()
const navItems = computed(() => [
  {
    icon: 'far fa-note-sticky',
    label: 'Notes',
    path: '/',
    isActive: route.name === 'notes'
  },
  {
    icon: 'fa-solid fa-chart-column',
    label: 'Stats',
    path: '/stats',
    isActive: route.name === 'stats'
  }
])

const onLogout = () => {
  storeAuth.onLogout()
}
</script>
