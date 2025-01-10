import { apiSlice } from "../apiSlice"

const UTILISATEUR_URL = "/utilisateur"

export const utilisateurApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        modifierUtilisateur: builder.mutation({
            query: (data) => ({
                url: `${UTILISATEUR_URL}/profil`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        getEquipeListe: builder.query({
            query: () => ({
                url: `${UTILISATEUR_URL}/get-equipe`,
                method: "GET",
                credentials: "include"
            })
        }),
        
        supprimerUtilisateur: builder.mutation({
            query: (id) => ({
                url: `${UTILISATEUR_URL}/${id}`,
                method: "DELETE",
                credentials: "include"
            })
        }),
        userAction: builder.mutation({
            query: (data) => ({
                url: `${UTILISATEUR_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        getNotifications: builder.query({
            query: () => ({
                url: `${UTILISATEUR_URL}/notifications`,
                method: "GET",
                credentials: "include"
            })
        }),
        marquerCommeLu: builder.mutation({
            query: (data) => ({
                url: `${UTILISATEUR_URL}/lire-notif?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),
        changerMotdepasse: builder.mutation({
            query: (data) => ({
                url: `${UTILISATEUR_URL}/changer-motdepasse`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        })
    })
});

export const { useModifierUtilisateurMutation, useGetEquipeListeQuery, useSupprimerUtilisateurMutation, useUserActionMutation, useChangerMotdepasseMutation, useGetNotificationsQuery, useMarquerCommeLuMutation } = utilisateurApiSlice;