<template lang="pug">
v-card(color="darkbg")
  template(#title) {{ header }}
  template(#text)
    v-form(
      @submit.prevent="onSubmit"
    )
      v-text-field.mb-2(
        v-model="data.email"
        variant="outlined"
        density="comfortable"
        autofocus
        required
        :error-messages="isFormSubmitted && emailErrors"
        @inerut="v$.email.$touch()"
      )
      v-text-field(
        v-model="data.password"
        variant="outlined"
        density="comfortable"
        type="password"
        required
        placeholder="Enter the password"
        :error-messages="isFormSubmitted && passwordErrors"
        @input="v$.password.$touch()"
      )

      div.pl-3.v-messages__message.auth-error(
        v-if="authStore.error"
        class="help is-danger"
      ) {{ authStore.error }}
          
      div.d-flex.flex-1.align-center.justify-end
        v-btn(
          type="submit"
          :loading="isLoading"
        ) {{ header }}
</template>

<script setup>
// imports
import { computed, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/useAuthStore'

// props
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['login', 'register'].includes(value)
  }
})

// store
const authStore = useAuthStore()

// data
const data = reactive({ email: '', password: '' })
const isLoading = ref(false)

// UI
const header = computed(() => (props.type === 'login' ? 'Login' : 'Register'))
const submitBtnClasses = computed(() => ({
  button: true,
  'is-primary': true,
  'is-loading': isLoading.value
}))

// validation
const rules = computed(() => ({
  email: { required, email },
  password: {
    required,
    ...(props.type === 'register' && {
      minLength: minLength(6)
    })
  }
}))
const isFormSubmitted = ref(false)
const v$ = useVuelidate(rules, data)
const emailErrors = computed(() => {
  return v$.value.email.$errors.map(item => item.$message)
})
const passwordErrors = computed(() => {
  return v$.value.password.$errors.map(item => item.$message)
})

// submit
const onSubmit = async () => {
  isFormSubmitted.value = true
  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  isLoading.value = true

  if (props.type === 'login') {
    await authStore.onLogin(data)
  } else {
    await authStore.onRegister(data)
  }

  isLoading.value = false
}
</script>

<style scoped>
.auth-error {
  color: rgb(255, 82, 82);
}
</style>
