<template lang="pug">
v-tabs.mb-2(
  :value="route.name"
  align-tabs="center"
)
  v-tab(
    v-for="({ value, to, label }) in tabs"
    :key="value"
    v-bind="{ value, to }"
  ) {{ label }}
router-view
</template>

<script setup>
// imports
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

// router
const route = useRoute()

// tabs
const tabs = computed(() => [
  {
    label: 'Login',
    value: 'login',
    to: { name: 'login' },
    classes: route.name === 'login' ? 'is-active' : ''
  },
  {
    label: 'Register',
    value: 'register',
    to: { name: 'register' },
    classes: route.name === 'register' ? 'is-active' : ''
  }
])
</script>
