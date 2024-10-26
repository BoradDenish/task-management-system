import gql from "graphql-tag";

export default defineNuxtPlugin((nuxtApp) => {
  const getUser = async (apolloClient, token) => {
    try {
      const response = await apolloClient.query({
        query: gql`
          query GetUser($token: String!) {
            user(token: $token) {
              role
              profile_image
              name
            }
          }
        `,
        variables: { token },
      });

      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  nuxtApp.provide("getUser", getUser);
});


