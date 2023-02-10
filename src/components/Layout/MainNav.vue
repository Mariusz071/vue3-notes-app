<template>
  <nav
    class="navbar is-success"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand ml-0">
        <div class="navbar-item is-size-4 is-family-monospace px-0">
          Noteballs
        </div>

        <a
          v-if="storeAuth.user"
          role="button"
          ref="refNavbarBurger"
          class="navbar-burger"
          :class="{ 'is-active': isMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="isMobileNav = !isMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        ref="refMobileMenu"
        :class="{ 'is-active': isMobileNav }"
      >
        <div
          v-if="storeAuth.user"
          class="navbar-start"
        >
          <button
            :class="logoutBtnClasses"
            @click="onLogout"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
        <div
          v-if="storeAuth.user"
          class="navbar-end"
        >
          <RouterLink
            class="navbar-item"
            active-class="is-active"
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="isMobileNav = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// imports
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/useAuthStore'

// store
const storeAuth = useAuthStore()
const navItems = [
  {
    label: 'Notes',
    path: '/'
  },
  {
    label: 'Stats',
    path: '/stats'
  }
]

const isMobileNav = ref(false)
const refMobileMenu = ref(null)
const refNavbarBurger = ref(null)

// handle click outside of menu
onClickOutside(refMobileMenu, () => (isMobileNav.value = false), {
  ignore: [refNavbarBurger]
})

const onLogout = () => {
  storeAuth.onLogout()
  isMobileNav.value = false
}

// UI
const logoutBtnClasses = computed(() => {
  const baseClasses = ['button', 'is-small', 'is-info', 'mt-3', 'ml-3']
  return useAuthStore.isLoading ? [...baseClasses, 'is-loading'] : baseClasses
})
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
