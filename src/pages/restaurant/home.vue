<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="restaurant"
      :items-per-page="10"
      :page="page"
      class="mt-3"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle>Products page</VToolbarTitle>
          <VSpacer></VSpacer>
        </VToolbar>
      </template>
      <template v-slot:item.id="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:item.name="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:item.contact="{ item }">
        {{ item.contact }}
      </template>
      <template v-slot:item.address="{ item }">
        {{ item.address }}
      </template>
      <template v-slot:item.actions="{ item }">
        <p
          @click="
            router.push({
              name: 'restaurant-update-id',
              params: { id: item.id }
            })
          "
        >
          update
        </p>

        <p @click="deleteRestaurant(item.id)">delete</p>
      </template>
    </VDataTable>
    <VPagination
      v-model="page"
      :length="pageCount"
      rounded="circle"
      :total-visible="$vuetify.display.mdAndUp ? 6 : 3"
      class="float-right"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
// Data
const restaurant = ref<any>([])
let page = ref<Number>(1)

const headers = ref<any>([
  { title: 'Id', key: 'id' },
  { title: 'Product name', key: 'name' },
  { title: 'Contact', key: 'contact' },
  { title: 'Address', key: 'address' },
  { title: 'Actions', key: 'actions', sortable: false }
])
// Computed
let pageCount = computed(() => {
  return Math.ceil(restaurant.value.length / 10)
})

// Methods
const loadData = async () => {
  const result = await axios.get('http://localhost:3000/restaurant')
  restaurant.value = result.data
}

const deleteRestaurant = async (id: any) => {
  const result = await axios.delete('http://localhost:3000/restaurant/' + id)
  if (result.status === 200) {
    loadData()
  }
}

// Hooks
onMounted(async () => {
  loadData()
})
</script>

<style>
.v-data-table-footer {
  display: none !important;
}
</style>