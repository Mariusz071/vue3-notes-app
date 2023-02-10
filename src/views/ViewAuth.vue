<template>
  <Container container-style="narrow">
    <div class="auth">
      <div class="tabs is-centered">
        <ul>
          <li
            v-for="tab in tabs"
            :key="tab.path"
            :class="tab.classes"
          >
            <RouterLink :to="tab.to">
              {{ tab.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div><RouterView /></div>
    </div>
  </Container>
</template>
<script setup>
// imports
import Container from '@/components/Layout/Container.vue'
import { computed } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

// router
const route = useRoute()

// tabs
const tabs = computed(() => [
  {
    label: 'Login',
    to: { name: 'login' },
    classes: route.name === 'login' ? 'is-active' : ''
  },
  {
    label: 'Register',
    to: { name: 'register' },
    classes: route.name === 'register' ? 'is-active' : ''
  }
])
</script>
