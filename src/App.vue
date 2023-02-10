<template>
  <MainNav />
  <div class="container is-max-desktop px-2 py-4">
    <Progressbar v-if="authStore.isLoading" />
    <RouterView v-else />
  </div>
</template>

<script setup>
// imports
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MainNav from '@/components/Layout/MainNav.vue'
import Progressbar from '@/components/Layout/Progressbar.vue'
import { useAuthStore } from '@/stores/useAuthStore'

// store
const authStore = useAuthStore()

onMounted(() => {
  authStore.listenForAuthChanges()
})
</script>
<style>
@import 'bulma/css/bulma.min.css';
</style>
