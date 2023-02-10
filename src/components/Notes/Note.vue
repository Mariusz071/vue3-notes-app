<template lang="pug">
DeleteModal(
  v-model="isDeleteModal"
  :note-id="note.id"
)
v-card.pa-2.pb-0.my-4
  template(#subtitle)
    small {{ formattedDate}}
    small {{ note.lengthInfo}}
  template(#text) {{ note.content}}
  v-divider
  v-card-actions.justify-end
    v-btn(
      size="small"
      variant="tonal"
      link
      :to="`edit/${note.id}`"
    )
      v-icon.mr-1 far fa-pen-to-square
      | Edit
    v-btn(
      size="small"
      variant="tonal"
      color="error"
      @click="isDeleteModal = true"
    ) 
      v-icon.mr-1 fa-solid fa-trash-can
      | Delete

</template>

<script setup>
// imports
import { computed, ref } from 'vue'
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

// delete modal control
const isDeleteModal = ref(false)
</script>
