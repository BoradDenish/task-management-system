<script>
import { useUserStore } from '~/store'

export default {
  data() {
    return {
      userStore: useUserStore()
    }
  },
  // created() {
  //   const token = this.userStore.getUserToken();
  //   console.log(token)
  // }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <!-- <SettingDialog />   -->
  </NuxtLayout>
</template>
