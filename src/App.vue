<template lang="pug">
v-app
  v-app-bar(
    color="primary"
    title="Notes App"
  )
    template(#prepend)
      v-btn(
        :icon="isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
        @click="isOpen = !isOpen"
      )
  MainNav(v-model="isOpen")
  v-main
    v-card
      Progressbar(v-if="authStore.isLoading")
      RouterView(v-else)
</template>

<script setup>
// imports
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import MainNav from '@/components/Layout/MainNav.vue'
import Progressbar from '@/components/Layout/Progressbar.vue'
import { useAuthStore } from '@/stores/useAuthStore'

// store
const authStore = useAuthStore()

// nav
const isOpen = ref('false')

onMounted(() => {
  authStore.listenForAuthChanges()
})
</script>
<style></style>
