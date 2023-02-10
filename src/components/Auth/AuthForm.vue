<template>
  <div class="auth-form">
    <div class="card">
      <div class="card-content">
        <div class="title has-text-centered">{{ header }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="data.email"
                  :class="{ input: true, 'is-danger': showEmailErrors }"
                  placeholder="e.g. alexsmith@gmail.com"
                  @input="v$.email.$touch()"
                />
                <template v-if="showEmailErrors">
                  <span
                    class="help is-danger"
                    v-for="error of v$.email.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}</span
                  >
                </template>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="data.password"
                  :class="{ input: true, 'is-danger': showPasswordErrors }"
                  type="password"
                  placeholder="Enter the password"
                  @input="v$.password.$touch()"
                />
                <template v-if="showPasswordErrors">
                  <span
                    class="help is-danger"
                    v-for="error of v$.password.$errors"
                    :key="error.$uid"
                    >{{ error.$message }}
                  </span>
                </template>
              </div>
            </div>
            <span
              v-if="authStore.error"
              class="help is-danger"
              >{{ authStore.error }}
            </span>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button :class="submitBtnClasses">{{ header }}</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
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
const emailErrors = computed(() => v$.value.email.$errors)
const passwordErrors = computed(() => v$.value.password.$errors)
const showEmailErrors = computed(
  () => emailErrors.value.length && isFormSubmitted.value
)
const showPasswordErrors = computed(
  () => passwordErrors.value.length && isFormSubmitted.value
)

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
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
