<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// Data
const rest = ref({
  name: '',
  contact: '',
  address: ''
})

// Methods
const updateRestaurant = async () => {
  const input = {
    name: rest.value.name,
    contact: rest.value.contact,
    address: rest.value.address
  }
  const result = await axios.put('http://localhost:3000/restaurant/' + `${route.params.id}`, input)
  if (result.status === 200) {
    router.push('/restaurant')
  }
}

// Hooks
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user-info') as any)
  // name.value = JSON.parse(user).name
  if (!user) {
    router.push('/signUp')
  }
  const result = await axios.get('http://localhost:3000/restaurant/' + `${route.params.id}`)
  rest.value = result.data
})
</script>
<template>
  <div>
    <div class="mx-auto restaurant">
      <VTextField v-model="rest.name" label="Restaurant name"></VTextField>
      <VTextField v-model="rest.contact" label="Contact"></VTextField>
      <VTextField v-model="rest.address" label="Address"></VTextField>

      <VBtn type="submit" color="primary" block class="mt-2" @click="updateRestaurant">update</VBtn>
    </div>
  </div>
</template>

<style  scoped>
.restaurant {
  width: 500px;
}
</style>