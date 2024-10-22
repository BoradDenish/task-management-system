import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeviceStore = defineStore("device", () => {
  const devices = ref({
    device_ip: "123.455.52",
    device_fcm_token:
      "APA91Em29yfuHSMKY7TCBJm5h-Joi6RSr2xTmgm6czjj09nZ4M7UVWtCb2AVuyL3HAwemHcmzVWrRa7vqIo8pz8QKaOoIRpIDxmGRPx4vsKsPnZlu21Fnna8qOrz0LSaKgbyIAmER6VCYPG9SU7HJgAfmqDf7WiwYT2mi2usvXiX06oSIMSpB0t",
    device_type: "1",
  });

  async function getDeviceIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      devices.value.device_ip = data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  }

  function detectAndSetDeviceType() {
    const userAgent = navigator.userAgent;
    let deviceType = 1;

    if (/mobile/i.test(userAgent)) {
      deviceType = 2;
    } else if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 3;
    }

    devices.value.device_type = deviceType;
  }

  return { devices, getDeviceIP, detectAndSetDeviceType };
});
