import { watch } from 'vue'

export const useWatchCharacters = (noteContent, maxChars = 100) => {
  watch(noteContent, val => {
    if (val && val.length >= maxChars) {
      alert(`Max ${maxChars} chars allowed`)
    }
  })
}
