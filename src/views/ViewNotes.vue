<template lang="pug">
AddEditNote
v-progress-linear(
  v-if="store.isLoading"
  indeterminate
)
template(v-else)
  Note(
  v-for="note in store.notes"
  v-bind="{ note }"
  :key="note.id"
)
v-card.mx-auto(
  v-if="isPlaceholderVisible"
  variant="tonal"
  max-width="300"
)
  template(#text) There's no notes added yet.
</template>

<script setup>
// imports
import { computed } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import Progressbar from '@/components/Layout/Progressbar.vue'
import { useNotesStore } from '@/stores/useNotesStore'

// store

// notes
const store = useNotesStore()
const isPlaceholderVisible = computed(
  () => !store.notes.length && !store.isLoading
)
</script>
