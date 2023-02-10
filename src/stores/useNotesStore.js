import { ref, computed } from 'vue'
import {
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'

import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { useAuthStore } from '@/stores/useAuthStore'

let notesCollectionRef
let notesQuery
let notesSnapshot = null

export const useNotesStore = defineStore('notesStore', () => {
  // state
  const notes = ref([])
  const isLoading = ref(false)

  // actions
  const getNotes = async () => {
    isLoading.value = true
    notesSnapshot = onSnapshot(
      notesQuery,
      querySnapshot => {
        const dbNotes = []
        querySnapshot.forEach(item => {
          dbNotes.push({
            id: item.id,
            ...item.data()
          })
        })
        notes.value = dbNotes
        isLoading.value = false
      },
      error => {
        console.error(error)
        isLoading.value = false
      }
    )
  }

  const initNotes = () => {
    const storeAuth = useAuthStore()
    notesCollectionRef = collection(db, 'users', storeAuth.user.uid, 'notes')
    notesQuery = query(
      notesCollectionRef,
      orderBy('created', 'desc')
      // limit(3)
    )
    getNotes()
  }

  const clearNotes = () => {
    if (notesSnapshot) {
      // unsubscribing from any active listener
      notesSnapshot()
    }

    notes.value = []
  }

  const addNote = async content => {
    await addDoc(notesCollectionRef, {
      content,
      created: Date.now()
    })
  }

  const removeNote = async id => {
    notes.value = notes.value.filter(item => item.id !== id)
    await deleteDoc(doc(notesCollectionRef, id))
  }

  const updateNote = async (id, content) => {
    await updateDoc(doc(notesCollectionRef, id), {
      content
    })
  }

  // getters
  const getNoteToEdit = computed(() => {
    return id => {
      const note = notes.value.find(item => item.id === id)
      return note ? note.content : ''
    }

    // return test
  })
  const getAllNotesCharacters = computed(() => {
    const notesContent = notes.value.map(item => item.content)
    return notesContent.join('').length
  })
  const getNumberOfNotes = computed(() => notes.value.length)

  return {
    notes,
    isLoading,
    initNotes,
    addNote,
    removeNote,
    updateNote,
    getNotes,
    clearNotes,
    getNoteToEdit,
    getNumberOfNotes,
    getAllNotesCharacters
  }
})
