<template>
  <div :class="`card has-background-${cardBgType}-dark p-4 mb-5`">
    <div class="field">
      <div class="control">
        <textarea
          v-model="noteContent"
          ref="newNoteTextAreaRef"
          class="textarea"
          v-bind="{ placeholder }"
          v-autofocus
          max-length="100"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          class="button is-link has-background-success"
          :disabled="!noteContent"
          @click="onSubmitHandler"
        >
          {{ submitLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/useNotesStore'
import { vAutofocus } from '@/directives/vAutofocus'
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
const newNoteTextAreaRef = ref(null)
const isAdding = computed(() => props.mode === 'add')

// save handling
const onAddNewNoteHandler = () => {
  store.addNote(noteContent.value)
  noteContent.value = ''
  newNoteTextAreaRef.value.focus()
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

const cardBgType = computed(() => (isAdding.value ? 'success' : 'link'))

onMounted(() => {
  if (!isAdding.value) {
    const val = store.getNoteToEdit(route.params.id)
    noteContent.value = val
  }
})

//watch characters
useWatchCharacters(noteContent)
</script>
