<template lang="pug">
v-container(:class="containerClasses[containerStyle]")
  slot
</template>
<script setup>
// props
const props = defineProps({
  containerStyle: {
    type: String,
    default: 'normal',
    validator: value => ['narrow', 'normal', 'wide'].includes(value)
  }
})

const containerClasses = {
  narrow: ['col-xl-6', 'col-md-8', 'col-sm-12', 'py-6'],
  normal: ['col-xl-8', 'col-md-11', 'col-sm-12', 'py-6'],
  wide: ['col-xl-10', 'col-md-11', 'col-sm-12', 'py-6']
}
</script>
