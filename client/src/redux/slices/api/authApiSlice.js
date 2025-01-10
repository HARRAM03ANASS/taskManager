import {apiSlice} from "../apiSlice"

const AUTH_URL = "/utilisateur"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (donnees) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: donnees,
                credentials: "include"
            })
        }),
        register: builder.mutation({
            query: (donnees) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: donnees,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: (donnees) => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        }),
    })
});

export const {useLoginMutation, useRegisterMutation,useLogoutMutation} = authApiSlice; 