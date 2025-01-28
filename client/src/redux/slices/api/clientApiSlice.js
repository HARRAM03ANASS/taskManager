// import { apiSlice } from "../apiSlice";

// const CLIENT_URL = "/client";

// export const clientApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getClients: builder.query({
//       query: () => ({
//         url: `${CLIENT_URL}`,
//         method: "GET",
//         credentials: "include",
//       }),
//     }),
//   }),
// });

// export const { useGetClientsQuery } = clientApiSlice;
import { apiSlice } from "../apiSlice";

const CLIENT_URL = "/client";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: `${CLIENT_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createClient: builder.mutation({
      query: (clientData) => ({
        url: `${CLIENT_URL}/creer`, // Assurez-vous que la route existe dans votre backend
        method: "POST",
        body: clientData,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetClientsQuery, useCreateClientMutation } = clientApiSlice;
