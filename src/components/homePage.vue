<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Home from '../pages/restaurant/home.vue'
import Add from '../pages/restaurant/add.vue'

//Data
const router = useRouter()
const currentTab = ref<Number>(0);
const restaurant = ref<any>([])

// Methods
const logOut = () => {
localStorage.clear()
router.push('/login')
}

// Hooks
onMounted( async()=> {
const user = JSON.parse(localStorage.getItem('user-info') as any)
if(!user) {
router.push('/signUp')
}
const result = await axios.get('http://localhost:3000/restaurant')
restaurant.value = result.data
})
</script>

<template>
  <div>
    <VTabs  v-model="currentTab">
    <VTab>Home</VTab>
    <VTab>Add Item</VTab>
    <VTab @click="logOut">Logout</VTab>
  </VTabs>
  <VWindow
    v-model="currentTab"
    class="mt-5"
  >
    <VCard class="mx-4 card-bg">
      <VCardText>
        <VWindowItem>
          <Home />
        </VWindowItem>
        <VWindowItem>
          <Add />
        </VWindowItem>
        </VCardText>
        </VCard>
        </VWindow>
 
  </div>
</template>



<style scoped>

</style>