<template>
  <div class="notes">
    <AddEditNote />
    <Progressbar v-if="store.isLoading" />
    <template v-else>
      <Note
        v-for="note in store.notes"
        :key="note.id"
        v-bind="{ note }"
      />
    </template>
    <div
      v-if="isPlaceholderVisible"
      class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    >
      There's no notes added yet.
    </div>
  </div>
</template>

<script setup>
// imports
import { computed } from 'vue'
import { useNotesStore } from '@/stores/useNotesStore'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import Progressbar from '@/components/Layout/Progressbar.vue'

// store

// notes
const store = useNotesStore()
const isPlaceholderVisible = computed(
  () => !store.notes.length && !store.isLoading
)
</script>
