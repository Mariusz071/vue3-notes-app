<template lang="pug">
v-app
  v-layout
    v-app-bar(
      :height="APP_BAR_HEIGHT"
      color="primary"
      title="Notes App"
    )
      template(#prepend)
        v-btn(
          :icon="isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"
          @click="isOpen = !isOpen"
        )
      template(#append)
        small(v-if="authStore.user") {{ authStore.user.email }}
    MainNav(v-model="isOpen")
    v-main
      Container
        v-progress-linear(
          v-if="authStore.isLoading"
          indeterminate
        )
        RouterView(v-else)
</template>

<script setup>
// imports
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { APP_BAR_HEIGHT } from '@/js/consts'
import { useAuthStore } from '@/stores/useAuthStore'
import Container from '@/components/Layout/Container.vue'
import MainNav from '@/components/Layout/MainNav.vue'

// store
const authStore = useAuthStore()

// nav
const isOpen = ref('false')

onMounted(() => {
  authStore.listenForAuthChanges()
})
</script>
<style></style>
