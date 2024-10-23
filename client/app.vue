<script>
import { useDeviceStore } from '~/store';

export default {
  data() {
    return {
      deviceStore: useDeviceStore(),
    };
  },
  mounted() {
    const { $createDevice } = this.$nuxt;

    if (!this.deviceStore.devices.device_ip) {
      this.deviceStore.getDeviceIP();
    }
    if (!this.deviceStore.devices.device_type) {
      this.deviceStore.detectAndSetDeviceType();
    }

    if (this.deviceStore.devices.device_ip && this.deviceStore.devices.device_type) {
      const apolloClient = this.$apollo;
      $createDevice(apolloClient, this.deviceStore.devices)
    }
  },
};
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
    <SettingDialog />
  </NuxtLayout>
</template>
