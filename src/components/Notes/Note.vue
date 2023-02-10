<template>
  <div
    class="card mb-4"
    :key="note.id"
  >
    <DeleteModal
      v-if="modals.delete"
      v-model="modals.delete"
      :note-id="note.id"
    />
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns-is-mobile has-text-grey-light mt-2">
          <small class="column">{{ formattedDate }}</small>
          <small class="column has-text-right">{{ noteLengthInfo }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        class="card-footer-item"
        :to="`edit/${note.id}`"
        >Edit
      </RouterLink>
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.delete = true"
      >
        Delete
      </a>
    </footer>
  </div>
</template>

<script setup>
// imports
import { computed, reactive } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { useNotesStore } from '@/stores/useNotesStore'
import DeleteModal from '@/components/Notes/DeleteModal.vue'

// props
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

// store
const store = useNotesStore()

// note UI info
const noteLengthInfo = computed(() => {
  const noteLength = props.note.content.length

  return noteLength === 1
    ? `${noteLength} character`
    : `${noteLength} characters`
})

const formattedDate = computed(() => {
  const date = new Date(props.note.created)
  return useDateFormat(date, 'DD-MM-YYYY @ HH:mm').value
})

// modals
const modals = reactive({
  delete: false
})
</script>
