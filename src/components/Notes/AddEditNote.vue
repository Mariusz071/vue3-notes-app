<template lang="pug">
v-card.pa-2.pb-0.mb-10
  v-textarea(
    v-model="noteContent"
    autofocus
    hide-details
    v-bind="{ placeholder }"
  )
  v-card-actions
    v-btn.mx-auto(
      :disabled="!noteContent"
      @click="onSubmitHandler"
    )
      v-icon.mr-1 far fa-square-plus
      | {{ submitLabel }}

</template>

<script setup>
// imports
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/useNotesStore'
import { useWatchCharacters } from '@/use/useWatchCharacters'

const store = useNotesStore()
const route = useRoute()
const router = useRouter()

// props
const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: 'add',
    validator: value => ['add', 'edit'].includes(value)
  }
})

// initial data
const noteContent = ref('')
const isAdding = computed(() => props.mode === 'add')

// save handling
const onAddNewNoteHandler = () => {
  store.addNote(noteContent.value)
  noteContent.value = ''
}

const onSaveEditNoteHandler = () => {
  store.updateNote(route.params.id, noteContent.value)
  router.push('/')
}
const onSubmitHandler = isAdding.value
  ? onAddNewNoteHandler
  : onSaveEditNoteHandler

// UI logic
const placeholder = computed(() => {
  return props.mode === 'add' ? 'Add new note' : ''
})

const submitLabel = computed(() => {
  return props.mode === 'add' ? 'Add New Note' : 'Save Note'
})

onMounted(() => {
  if (!isAdding.value) {
    const val = store.getNoteToEdit(route.params.id)
    noteContent.value = val
  }
})

//watch characters
useWatchCharacters(noteContent)
</script>
