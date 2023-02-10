import { createRouter, createWebHashHistory } from 'vue-router'

import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import ViewLogin from '@/views/ViewLogin.vue'
import ViewRegister from '@/views/ViewRegister.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const history = createWebHashHistory()
const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth,
    children: [
      {
        path: '',
        name: 'login',
        component: ViewLogin
      },
      {
        path: 'register',
        name: 'register',
        component: ViewRegister
      }
    ]
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: ViewEditNote
  }
]

const router = createRouter({
  history,
  routes
})

router.beforeEach(async (to, from) => {
  const storeAuth = useAuthStore()
  if (!storeAuth.user && !['login', 'register'].includes(to.name)) {
    return false
  }

  if (storeAuth.user && ['login', 'register'].includes(to.name)) {
    return false
  }
})

export { router }
