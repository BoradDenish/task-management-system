<script>
import { useUserStore } from '~/store'

export default {
  data() {
    return {
      userStore: useUserStore()
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      const token = this.userStore.getUserToken();
      if (token) {
        const { $getUser } = useNuxtApp();
        const apolloClient = this.$apollo;

        try {
          const user = await $getUser(apolloClient, token);
          if (user) {
            this.userStore.setUserDetails(user);
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          this.userStore.clearUserToken();
        }
      }
    }
  }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <!-- <SettingDialog />   -->
  </NuxtLayout>
</template>
