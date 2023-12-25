<script setup lang="ts">
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { emailValidator, passwordValidator, validateWithFieldName } from '../utils/validators'
import { ref } from 'vue'
import axios from 'axios'
import type { VForm } from 'vuetify/components/VForm'

import { useRouter } from 'vue-router'
const router = useRouter()

// Data
const password = ref<any>('')
const email = ref<any>('')
const show1 = ref<boolean>(false)
const loginForm = ref<VForm | any>()

// Methods
const login = async () => {
  const valid = await loginForm.value.validate()
  if (valid.valid) {
    const result = await axios.get(
      `http://localhost:3000/users?email=${email.value}&password=${password.value}`
    )

    if (result.status === 200 && result.data.length > 0) {
      localStorage.setItem('user-info', JSON.stringify(result.data[0]))
      toast('login successfully !', {
        autoClose: 2000
      })
      setTimeout(() => {
        router.push('/restaurant')
      }, 1000)
    } else {
      toast('User not found, please signUp !', {
        autoClose: 2000
      })
      email.value = ''
      password.value = ''
    }
  }
}
</script>
<template>
  <div class="mx-auto login mt-5">
    <VForm @submit.prevent="login" ref="loginForm">
      <VTextField
        v-model="email"
        label="Email"
        :rules="[validateWithFieldName(email, 'enter email'), emailValidator]"
      ></VTextField>
      <VTextField
        v-model="password"
        label="password"
        :rules="[validateWithFieldName(password, 'password'), passwordValidator]"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click="show1 = !show1"
      ></VTextField>
      <VBtn type="submit" color="primary" block class="mt-2">Login</VBtn>
      <p class="mt-2 text-end">
        Don't have an account? <RouterLink to="/signUp">Sign up</RouterLink>
      </p>
    </VForm>
  </div>
</template>
  
  <style scoped>
.login {
  width: 500px;
}
</style>