<template>
  <div class="modal is-active p-4">
    <div class="modal-background"></div>
    <div
      class="modal-card"
      ref="refDeleteModal"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal"
        ></button>
      </header>
      <section class="modal-card-body">
        Are sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
          class="button is-danger"
          @click="onDelete"
        >
          Delete
        </button>
        <button
          class="button"
          @click="closeModal"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
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
const refDeleteModal = ref(null)
onClickOutside(refDeleteModal, closeModal)

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
