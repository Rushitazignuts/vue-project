<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { emailValidator, passwordValidator, validateWithFieldName } from '../utils/validators'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import type { VForm } from 'vuetify/components/VForm'
const router = useRouter()

// Data
const username = ref<any>('')
const password = ref<any>('')
const email = ref<any>('')
const show1 = ref<boolean>(false)
const registerForm = ref<VForm | any>()

// Methods
const signUp = async () => {
  const valid = await registerForm.value.validate()

  if (valid.valid) {
    const input = {
      name: username.value,
      email: email.value,
      password: password.value
    }
    const result = await axios.post('http://localhost:3000/users', input)
    if (result.status === 201) {
      localStorage.setItem('user-info', JSON.stringify(result.data))
      toast('signup successfully !', {
        autoClose: 2000
      })
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
  }
}

// Hooks
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user-info') as any)
  if (user) {
    // router.push('/restaurant')
  }
})
</script>

<template>
  <div class="mx-auto sign-up mt-5">
    <VForm @submit.prevent="signUp" ref="registerForm">
      <VTextField
        v-model="username"
        label="User Name"
        :rules="[validateWithFieldName(username, 'field is required')]"
      ></VTextField>
      <VTextField
        v-model="email"
        label="Email"
        :rules="[validateWithFieldName(email, 'enter email'), emailValidator]"
      ></VTextField>
      <VTextField
        v-model="password"
        label="password"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        :rules="[validateWithFieldName(password, 'enter password'), passwordValidator]"
        @click="show1 = !show1"
      ></VTextField>
      <VBtn type="submit" color="primary" block class="mt-2">Sign up</VBtn>
      <p class="mt-2 text-end">
        already have an account? <RouterLink to="/login">Login</RouterLink>
      </p>
    </VForm>
  </div>
</template>

<style scoped>
.sign-up {
  width: 500px;
}
</style>