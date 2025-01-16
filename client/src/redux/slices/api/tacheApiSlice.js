import { apiSlice } from "../apiSlice"
const TACHE_URL = "/tache";

export const tacheApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TACHE_URL}/dashboard`,
                method: "GET",
                credentials: "include"
            }),
            transformResponse: (response) => {
                const totalTasks = response.completedTasks + response.pendingTasks + response.overdueTasks;
                return { ...response, totalTasks };
            },
        }),

        getAllTasks: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TACHE_URL}?phase=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: "GET",
                credentials: "include"
            })
        }),

        creerTache: builder.mutation({
            query: (data) => ({
                url: `${TACHE_URL}/creer`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),

        dupliquerTache: builder.mutation({
            query: (id) => ({
                url: `${TACHE_URL}/dupliquer/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),

        modifierTache: builder.mutation({
            query: (data) => ({
                url: `${TACHE_URL}/modifier/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),

        tachesSupprimees: builder.mutation({
            query: ({ id }) => ({
                url: `${TACHE_URL}/${id}`,
                method: "PUT",
                credentials: "include"
            })
        }),

        creerSousTache: builder.mutation({
            query: ({ data, id }) => ({
                url: `${TACHE_URL}/creer-soustache/${id}`,
                method: "PUT",
                body: data,
                credentials: "include"
            })
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TACHE_URL}/${id}`,
                method: "GET",
                credentials: "include"
            })
        }),
        searchTaches: builder.query({
            query: (query) => ({
                url: `${TACHE_URL}/search`, 
                method: "GET",
                params: { query }, 
                credentials: "include",
            }),
        }),
        // getTachesForUser: builder.query({
        //     query: (userId) => ({
        //       url: `${TACHE_URL}/${userId}`,  // Make sure this matches your backend route
        //       method: "GET",
        //       credentials: "include"
        //     }),
        // })
        
        
    })
});

export const { 
    useTachesSupprimeesMutation,
    useGetDashboardStatsQuery, 
    useGetAllTasksQuery, 
    useCreerTacheMutation, 
    useDupliquerTacheMutation, 
    useModifierTacheMutation, 
    useCreerSousTacheMutation,
    useGetSingleTaskQuery,
    useSearchTachesQuery,
    // useGetTachesForUserQuery,
} = tacheApiSlice;