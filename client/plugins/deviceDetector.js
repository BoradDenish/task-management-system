export default defineNuxtPlugin((nuxtApp) => {
  const createDevice = async (apolloClient, device) => {
    try {
      const response = await apolloClient.mutate({
        mutation: gql`
          mutation createDevice($input: CreateDeviceInput!) {
            createDevice(input: $input) {
              id
              device_ip
              device_fcm_token
              device_type
            }
          }
        `,
        variables: {
          input: {
            device_ip: device.device_ip,
            device_fcm_token: device.device_fcm_token,
            device_type: device.device_type,
          },
        },
      });

      console.log("response.data", response.data);
      return response.data.createDevice;
    } catch (error) {
      console.error("Error creating device:", error);
      throw error;
    }
  };

  nuxtApp.provide("createDevice", createDevice);
});
