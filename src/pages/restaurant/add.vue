<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

// Data
const rest = ref<any>({
  name: '',
  contact: '',
  address: ''
})

// Methods
const addRestaurant = async () => {
  const input = {
    name: rest.value.name,
    contact: rest.value.contact,
    address: rest.value.address
  }
  const result = await axios.post('http://localhost:3000/restaurant', input)
  if (result.status === 201) {
    router.push('/restaurant/home')
  }
}

// Hooks
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user-info') as any)
  if (!user) {
    router.push('/signUp')
  }
})
</script>
<template>
  <div>
    <div class="mx-auto restaurant">
      <VTextField v-model="rest.name" label="Restaurant name"></VTextField>
      <VTextField v-model="rest.contact" label="Contact"></VTextField>
      <VTextField v-model="rest.address" label="Address"></VTextField>

      <VBtn type="submit" color="primary" block class="mt-2" @click="addRestaurant">Add</VBtn>
    </div>
  </div>
</template>

<style scoped>
.restaurant {
  width: 500px;
}
</style>