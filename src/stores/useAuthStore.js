import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/js/firebase'
import { firebaseCodeToErrorMap } from '@/js/utils'
import { useNotesStore } from '@/stores/useNotesStore'

export const useAuthStore = defineStore('authStore', () => {
  const notesStore = useNotesStore()

  // state
  const user = ref(null)
  const error = ref('')
  const isLoading = ref(false)

  // actions
  const listenForAuthChanges = onAuthStateChanged(auth, async currentUser => {
    if (currentUser) {
      isLoading.value = true
      user.value = currentUser
      await notesStore.initNotes()

      setTimeout(() => {
        // faking loading effect to make progressbar appear
        isLoading.value = false
      }, 1500)
      router.push('/')
    } else {
      user.value = null
      router.push('/auth')
      notesStore.clearNotes()
    }
  })

  const onLogin = async ({ email, password }) => {
    error.value = ''
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      user.value = res.user
      notesStore.initNotes()

      router.push('/')
    } catch (e) {
      console.error(e)
      error.value = firebaseCodeToErrorMap[e.code]
    }
  }

  const onLogout = async () => {
    error.value = ''
    try {
      await signOut(auth)
      user.value = null
      router.push('/auth')
      notesStore.clearNotes()
    } catch (e) {
      console.error(e)
      error.value = firebaseCodeToErrorMap[e.code] || e.code
    }
  }

  const onRegister = async ({ email, password }) => {
    error.value = ''
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      user.value = res.user
      notesStore.initNotes()
      router.push('/')
    } catch (e) {
      error.value = firebaseCodeToErrorMap[e.code] || e.code
    }
  }

  return {
    user,
    error,
    isLoading,
    onLogin,
    onLogout,
    onRegister,
    listenForAuthChanges
  }
})
