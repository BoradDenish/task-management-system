import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", () => {
  const devices = ref({
    device_ip: "",
    device_fcm_token: "",
    device_type: "",
  });

  function setDeviceIP(ip) {
    devices.value.device_ip = ip;
  }

  return { devices };
});
