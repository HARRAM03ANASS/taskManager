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
        postActivity: builder.mutation({
            query: ({ id, activity }) => ({
              url: `${TACHE_URL}/activite/${id}`,
              method: "POST",
              body: {
                type: activity.type,
                activite: activity.activite,
                atouts: activity.atouts // Add this line to include the files
              },
              credentials: "include",
            }),
          }),
        //   createBulkTasks: builder.mutation({
        //     query: (tasks) => ({
        //       url: `${TACHE_URL}/bulk`,
        //       method: 'POST',
        //       body: { tasks },
        //       credentials: 'include',
        //     }),
        //   }),
          
        
        
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
    usePostActivityMutation,
} = tacheApiSlice;