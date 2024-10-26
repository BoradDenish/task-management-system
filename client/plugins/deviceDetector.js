export default defineNuxtPlugin((nuxtApp) => {
  const createDevice = async (apolloClient, device) => {
    try {
      // const response = await apolloClient.mutate({
      //   mutation: gql`
      //     mutation createDevice($input: CreateDeviceInput!) {
      //       createDevice(input: $input) {
      //         success
      //         data {
      //           id
      //         }
      //       }
      //     }
      //   `,
      //   variables: {
      //     input: {
      //       device_ip: device.device_ip,
      //       device_fcm_token: device.device_fcm_token,
      //       device_type: device.device_type,
      //     },
      //   },
      // });

      // return response.data.createDevice;

      console.log("call");
    } catch (error) {
      console.error("Error creating device:", error);
      throw error;
    }
  };

  nuxtApp.provide("createDevice", createDevice);
});
