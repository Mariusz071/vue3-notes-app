<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ store.getNumberOfNotes }}</td>
        </tr>
        <tr>
          <td>Number of character (all notes)</td>
          <td>{{ store.getAllNotesCharacters }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="comment"
      type="text"
      class="input"
      placeholder="Add comment"
      v-autofocus
    />
  </div>
</template>

<script setup>
// imports
import { ref } from 'vue'

import { useNotesStore } from '@/stores/useNotesStore'
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters'

// comment
const comment = ref('')
useWatchCharacters(comment, 10)

// store
const store = useNotesStore()
</script>
