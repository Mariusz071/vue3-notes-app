<template lang="pug">
v-dialog(
  :model-value="modelValue"
  width="500"
)
  v-card
    template(#title)
      div.d-flex.justify-space-between.align-center
        | Delete Note?
        v-btn(
          icon="fa-solid fa-xmark"
          variant="tonal"
          size="x-small"
          @click="closeModal"
        )
    template(#text) Are sure you want to delete this note?
    v-card-actions.justify-end
      v-btn(
        size="small"
        variant="tonal"
        @click="closeModal"
      )
        v-icon.mr-1 far fa-pen-to-square
        | Cancel
      v-btn(
        size="small"
        variant="tonal"
        color="error"
        @click="onDelete"
      ) 
        v-icon.mr-1 fa-solid fa-trash-can
        | Delete



</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useNotesStore } from '@/stores/useNotesStore'

// props
const props = defineProps({
  noteId: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

// emits
const emit = defineEmits(['update:modelValue'])

// store
const store = useNotesStore()

// closing modal
const closeModal = () => emit('update:modelValue', false)

// deleting note
const onDelete = () => store.removeNote(props.noteId)

// keyboard controls
const onEsc = e => e.key === 'Escape' && closeModal()
onMounted(() => {
  document.addEventListener('keyup', onEsc)
})

onUnmounted(() => {
  document.removeEventListener('keyup', onEsc)
})
</script>
