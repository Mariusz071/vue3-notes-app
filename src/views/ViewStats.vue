<template lang="pug">
v-table
  thead
    tr
      th Stat
      th Value
  tbody
    tr
      td Number of notes
      td {{ store.getNumberOfNotes }}
    tr
      td Number of characters (all notes)
      td {{ store.getAllNotesCharacters }}
</template>

<script setup>
import { useNotesStore } from '@/stores/useNotesStore'
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters'

// store
const store = useNotesStore()
</script>
