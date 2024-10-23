export const queryGraphQL = async (apolloClient, query, variables) => {
  try {
    const response = await apolloClient.query({
      query: gql`
        ${query}
      `,
      variables,
    });
    return response.data;
  } catch (e) {
    console.error("GraphQL Query Error:", e);
    throw e;
  }
};

export const mutateGraphQL = async (apolloClient, mutation, variables) => {
  try {
    const response = await apolloClient.mutate({
      mutation: gql`${mutation}`,
      variables,
    });
    return response.data;
  } catch (e) {
    console.error("GraphQL Mutation Error:", e);
    throw e;
  }
};
