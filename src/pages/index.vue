
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const redirectToPage = () => {
  router.push('/signUp')
}
</script>
<template>
  <div>
    <div class="index-page">
      <VImg
        height="100"
        contain
        src="https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/logo.svg"
      />
      <h1 class="mt-3 text-center">
        {{ 'Welcome to our app!!' }}
      </h1>

      <div class="d-flex align-center justify-center mt-7">
        <VBtn size="large" @click="redirectToPage">
          {{ 'Get started' }}
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.index-page {
  margin-block-start: 50px;
  margin-inline: auto;
  max-inline-size: 900px;
}

.description {
  max-inline-size: 25rem;
}

.feature {
  max-inline-size: 30%;
}
</style>